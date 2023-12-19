import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Misc/Spinner'
import { FaSignInAlt } from 'react-icons/fa'


/**
 * Login component for user authentication.
 * Allows users to enter their email and password to log in.
 * @returns {JSX.Element} - Rendered Login component.
 */
function Login() {
    // Local state to store user input (email and password)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    // Hook to navigate to different routes
    const navigate = useNavigate();
    // Redux dispatch function
    const dispatch = useDispatch();

    // Get user authentication state from Redux store
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    // Redirect to home page if the user is already authenticated
    useEffect(() => {
        if (user) {
        navigate('/');
        }
    }, [user, navigate]);

    // Display error message if authentication fails, and reset the state
    useEffect(() => {
        if (isError) {
        toast.error(message);
        }

        if (isSuccess || user) {
        navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    // Handle input change
    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }));
    };

    // Handle form submission for user login
    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
        email,
        password,
        };
        dispatch(login(userData));
    };

    // Display loading spinner while authentication is in progress
    if (isLoading) {
        return <Spinner />;
    }

    // Render the Login component
    return (
        <>
            <section className='heading-auth'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please login</p>
            </section>

            <section className='form user-auth'>
                <form onSubmit={onSubmit}>
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
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
    
}

export default Login