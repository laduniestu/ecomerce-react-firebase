import { myFirebase } from '../firebase/firebase';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const ADMIN_SUCCESS = "ADMIN_SUCCESS";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestSignup= () => {return{type: SIGNUP_REQUEST};};
const receiveSignup = user => {return{type: SIGNUP_SUCCESS, user};};
const signupError= () => {return{type: SIGNUP_FAILURE};};
export const signUser = (name, email, password) => dispatch => {
    dispatch(requestSignup());
    myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials)=>{
            if(userCredentials.user){
                userCredentials.user.updateProfile({
                    displayName: name
                })
            }
            dispatch(receiveSignup());
        })
        .catch(error => {
            dispatch(signupError());
        })
}

const requestLogin = () => {return {type: LOGIN_REQUEST };};
const loginError = () => {return{type: LOGIN_FAILURE};};
export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(loginUser(user));
        })
        .catch(error => {
            dispatch(loginError());
        })
}

const verifyRequest = () => {return{type: VERIFY_REQUEST};};
const verifySuccess = () => {return{type: VERIFY_SUCCESS};};
const receiveLogin = user => {return {type: LOGIN_SUCCESS,user};};
const recieveAdmin = user => {return {type: ADMIN_SUCCESS,user};};
export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    myFirebase.auth().onAuthStateChanged(user => {
        if (user != null) {
            if(user.email==="duniedun@gmail.com"){
                dispatch(recieveAdmin());
            }
            dispatch(receiveLogin());
        }
        dispatch(verifySuccess());
    })
}

const requestLogout = () => {return{type: LOGOUT_REQUEST };};
const receiveLogout = () => {return{type: LOGOUT_SUCCESS, };};
const logoutError = () => {return{type: LOGOUT_FAILURE};};
export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    myFirebase
        .auth()
        .signOut()
        .then(res => {
            dispatch(receiveLogout());
            
        })
        .catch(error => {
            dispatch(logoutError());
        })
}



