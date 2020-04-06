import { signUpNewUser, loginUser, inviteUser } from './AuthApi';
import {
  SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_ERROR,
  SIGNIN_LOADING, SIGNIN_SUCCESS, SIGNIN_ERROR, SIGNIN_LOGGEDIN,
  INVITE_LOADING, INVITE_SUCCESS, INVITE_ERROR,
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
    dispatch({ type: SIGNIN_LOADING });

    // console.log('user', user);
    const { data } = await loginUser(user);
    // console.log(data);
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('userWidgetView', false);
    localStorage.setItem('projectWidgetView', false);
    dispatch({ type: SIGNIN_LOGGEDIN });
  } catch (error) {
    dispatch({ type: SIGNIN_ERROR, payload: error });
  }
};

export const inviteUsers = (user) => async (dispatch) => {
    // dispatch({ type: INVITE_LOADING });
    // const { data,error } = await inviteUser(user);
    // console.log(error)
    // if (data) {
    //   dispatch({ type: INVITE_SUCCESS, payload: data });
    //   window.location = '/users';
    // }
    // else {
    //   dispatch({ type: INVITE_ERROR, payload: data });
    // }
    try{
    dispatch({ type: INVITE_LOADING });
    const { data } = await inviteUser(user);
    dispatch({ type: INVITE_SUCCESS, payload: data });
    window.location = '/users';
  }
  catch(error) {
      dispatch({ type: INVITE_ERROR, payload: error });
    }
};
