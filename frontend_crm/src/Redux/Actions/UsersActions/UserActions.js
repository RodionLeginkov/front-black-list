import { loadAllUsers, loadUser } from './UsersApi';
import {
  LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_ERROR, FIND_USER, DELETE_USER,
  FILTER_USER_STATUS, LOAD_CURRENT_USER, LOAD_CURRENT_USER_SUCCESS,
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

export const getUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_CURRENT_USER });
    const loginToken = JSON.parse(localStorage.getItem('tokens'));
    const { data } = await loadUser(loginToken, userId);
    dispatch({ type: LOAD_CURRENT_USER_SUCCESS, payload: data.info[0] });
  } catch (error) {
    dispatch({ type: LOAD_USER_ERROR, payload: error });
  }
};

export const findUser = (id) => ({ type: FIND_USER, payload: id });

export const deleteUser = (userId) => {
  return { type: DELETE_USER, payload: userId };
}

export const filteredUserStatus = (selectedFilters) => {
  return { type: FILTER_USER_STATUS, payload: selectedFilters };
}
