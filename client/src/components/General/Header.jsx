import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

/**
 * Header component for navigation and user authentication actions.
 * Renders the REIApp logo, navigation links, and user authentication buttons.
 * @returns {JSX.Element} - Rendered Header component.
 */
function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    /**
    * Handles user logout by dispatching logout and reset actions.
    * Navigates to the home page after logout.
    */
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>REIApp</Link>
        </div>
        <ul>
            {user ? (
                <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
                ) : (
                <>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
            
            </>)}
            
        </ul>
    </header>
  )
}

export default Header