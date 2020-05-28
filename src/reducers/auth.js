import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    ADMIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    VERIFY_REQUEST,
    VERIFY_SUCCESS
} from '../actions/auth';

export default (
    state = {
        isLoggingdIn: false,
        isLoggingOut: false,
        isVerifying: false,
        loginError: false,
        logoutError: false,
        isAuthenticated: false,
        isAdmin: false,
        verifyingError: false,
        user: {}
        
    },
    
    action
    
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingdIn: true,
                loginError: false
            }
            // break;
        case ADMIN_SUCCESS:
            return {
                ...state,
                isLoggingdIn: false,
                isAuthenticated: true,
                isAdmin: true,
                user: action.user,
                
            }
            //break;
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingdIn: false,
                isAuthenticated: true,
                user: action.user,
                
            }
            //break;
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingdIn: false,
                isAuthenticated: false,
                loginError: true
            }
            //break;
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                loginError: false
            }
            //break;
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                isAdmin: false,
                user: {}
            }
            //break;
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                loginError: true
            }
            //break;
        case VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
                verifyingError: false
            }
            //break;
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false
            }
            //break;
        default:
            return state;
    }
}