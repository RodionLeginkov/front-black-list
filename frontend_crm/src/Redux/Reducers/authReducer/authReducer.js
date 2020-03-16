import { act } from 'react-dom/test-utils';
import {
  SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_ERROR,
  SIGNIN_LOADING, SIGNIN_SUCCESS, SIGNIN_ERROR,
} from '../../ActionTypes/authTypes/authTypes';

const intitialState = {
  // user: localstorage.getItem() || null,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = intitialState, action) => {
  switch (action.type) {
    case SIGNIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case SIGNUP_LOADING:
      return {
        ...state,
        loading: true,
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
      };
    default:
      return state;
  }
};

export default authReducer;
