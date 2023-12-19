import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Misc/Spinner'
import AlertPop from '../components/Misc/AlertPop'

/**
 * Register component for user registration.
 * Allows users to create a new account by providing required information.
 * Validates form fields and displays error messages accordingly.
 * @returns {JSX.Element} - Rendered Register component.
 */
function Register() {
    // Local state to store form data
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        password: '',
        password2: '',    
    })

    const { fname, lname, email, phone, password, password2 } = formData
    
    // Hook to navigate to different routes
    const navigate = useNavigate();
    // Redux dispatch function
    const dispatch = useDispatch();

    // Get user authentication state from Redux store
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    // Redirect to the home page if the user is already authenticated
    useEffect(() => {
        if(user){
          navigate('/')
        }
      }, [user, navigate])

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])
    
    

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!fname || !lname || !email || !phone || !password || !password2) {
            toast.error('Please fill out all fields');
        } else if(password !== password2){
            toast.error('Passwords do not match')
        } else {
            const userData = {
                fname,
                lname, 
                email,
                phone, 
                password,
            }
            dispatch(register(userData))
        }
        toast.error('New user registration is currently not allowed for public access.')        
    }
  
    if(isLoading) {
        return <Spinner/>
    }
    
    // Render the Register component
    return (
        <>
        <section className='heading-auth'>
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please create an account</p>
            {/*<AlertPop open={true} linkTo={`/login`} buttonText={"Login"} title={"Unauthorized"} desc={"New user registration is currently not allowed for public access."}/>*/}

        </section>

        <section className='form user-auth'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type='text'
                        className='form-control'
                        id='fname'
                        name='fname'
                        value={fname}
                        placeholder='Enter your first name'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input
                        type='text'
                        className='form-control'
                        id='lname'
                        name='lname'
                        value={lname}
                        placeholder='Enter your last name'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input
                        type='phone'
                        className='form-control'
                        id='phone'
                        name='phone'
                        value={phone}
                        placeholder='Enter your phone number'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Enter password'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input
                        type='password'
                        className='form-control'
                        id='password2'
                        name='password2'
                        value={password2}
                        placeholder='Confirm password'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <button type='submit' className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
   ) 
}

export default Register