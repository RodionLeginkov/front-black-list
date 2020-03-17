import { act } from 'react-dom/test-utils';
import {
  SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_ERROR,
  SIGNIN_LOADING, SIGNIN_SUCCESS, SIGNIN_ERROR,
  SIGNIN_LOGGEDIN,
} from '../../ActionTypes/authTypes/authTypes';

const intitialState = {
  // user: localstorage.getItem() || null,
  user: null,
  loading: false,
  error: null,
  loggedIn: false,
};

const authReducer = (state = intitialState, action) => {
  switch (action.type) {
    case SIGNIN_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        loggedIn: true,
        error: null,
      };
    case SIGNIN_LOGGEDIN:
      return {
        ...state,
        loggedIn: false,
        error: null,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        loggedIn: false,
      };
    case SIGNUP_LOADING:
      return {
        ...state,
        loading: true,
        loggedIn: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        error: true,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
