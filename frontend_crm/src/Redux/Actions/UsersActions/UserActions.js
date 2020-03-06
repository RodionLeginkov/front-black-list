import { loadAllUsers } from './UsersApi';
import {
  LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_ERROR, FIND_USER, DELETE_USER,
} from '../../ActionTypes/usersTypes/usersTypes';

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER });
    const loginToken = JSON.parse(localStorage.getItem('tokens'));
    const { data } = await loadAllUsers(loginToken);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_ERROR, payload: error });
  }
};

export const findUser = (id) => ({ type: FIND_USER, payload: id });



export const deleteUser = (userId) => {
  return { type: DELETE_USER, payload: userId };
}