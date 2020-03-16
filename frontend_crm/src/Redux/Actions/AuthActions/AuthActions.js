import { signUpNewUser, loginUser } from './AuthApi';
import {
  SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_ERROR,
  SIGNIN_LOADING, SIGNIN_SUCCESS, SIGNIN_ERROR,
} from '../../ActionTypes/authTypes/authTypes';

export const signUp = (login, password) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_LOADING });
    const { data } = await signUpNewUser(login, password);
    console.log('DATA', data);
    dispatch({ type: SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SIGNIN_ERROR, payload: error });
  }
};

export const signIn = (user) => async (dispatch) => {
  try {
    // console.log('Login', login, 'password', password);
    // console.log('user', user);
    dispatch({ type: SIGNIN_LOADING });
    const { data } = await loginUser(user);
    console.log('DATA', data);
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SIGNUP_ERROR, payload: error });
  }
};
