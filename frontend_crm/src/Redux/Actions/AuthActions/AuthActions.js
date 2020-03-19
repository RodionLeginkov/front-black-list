import { signUpNewUser, loginUser } from './AuthApi';
import {
  SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_ERROR,
  SIGNIN_LOADING, SIGNIN_SUCCESS, SIGNIN_ERROR, SIGNIN_LOGGEDIN,
} from '../../ActionTypes/authTypes/authTypes';

export const signUp = (user) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_LOADING });
    const { data } = await signUpNewUser(user);
    dispatch({ type: SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SIGNUP_ERROR, payload: error });
  }
};

export const signIn = (user) => async (dispatch) => {
  try {
    // console.log('Login', login, 'password', password);
    // console.log('user', user);
    dispatch({ type: SIGNIN_LOADING });
    const { data } = await loginUser(user);
    // console.log(data);
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    dispatch({ type: SIGNIN_LOGGEDIN });
  } catch (error) {
    dispatch({ type: SIGNIN_ERROR, payload: error });
  }
};
