import { NotificationManager } from 'react-notifications';
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
    dispatch({ type: SIGNIN_LOADING });
    const { data } = await loginUser(user);
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('token', data.token.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('userWidgetView', false);
    localStorage.setItem('projectWidgetView', false);
    dispatch({ type: SIGNIN_LOGGEDIN });
  } catch (error) {
    dispatch({ type: SIGNIN_ERROR, payload: error });
  }
};

export const inviteUsers = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVITE_LOADING });
    const { data } = await inviteUser(id);
    dispatch({ type: INVITE_SUCCESS, payload: data });
    NotificationManager.success('The message was sent');
  } catch (error) {
    dispatch({ type: INVITE_ERROR, payload: error });
    NotificationManager.error('The message wasn\'t sent');
  }
};
