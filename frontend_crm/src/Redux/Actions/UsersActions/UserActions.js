import {
  loadAllUsers, loadUser, deletedUser, patchUser, postUser,
} from './UsersApi';
import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  FIND_USER,
  DELETE_USER,
  DELETE_USER_ERROR,
  LOAD_CURRENT_USER,
  LOAD_CURRENT_USER_SUCCESS,
  FILTER_USER_NAME,
  EDIT_USER,
  EDIT_USER_ERROR,
  ADD_USER,
  ADD_USER_ERROR,
} from '../../ActionTypes/usersTypes/usersTypes';

export const getUsers = (filter,sort) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER });
    console.log("dispatch",filter)
    
    const loginToken = localStorage.getItem('token');
    const { data } = await loadAllUsers(filter,sort, loginToken);
    console.log("DATA",data)
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_ERROR, payload: error });
  }
};

export const getUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_CURRENT_USER });
    const loginToken = localStorage.getItem('token');
    const { data } = await loadUser(loginToken, userId);
    dispatch({ type: LOAD_CURRENT_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_ERROR, payload: error });
  }
};

export const findUser = (id) => ({ type: FIND_USER, payload: id });

export const deleteUser = (id) => async (dispatch) => {
  try {
    const loginToken = localStorage.getItem('token');
    await deletedUser(loginToken, id);
    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_USER_ERROR, payload: error });
  }
};

export const updateUser = (userData) => async (dispatch) => {
  try {
    const loginToken = localStorage.getItem('token');
    console.log('USER',userData);
    const { data } = await patchUser(loginToken, userData.uuid, userData);
    console.log('DATA',data);
    dispatch({ type: EDIT_USER, payload: data });
  } catch (error) {
    dispatch({ type: EDIT_USER_ERROR, payload: error });
  }
};

// export const filteredUserRole = (selectedFilters) => {
//   if (!selectedFilters.length) return { type: FILTER_USER_ROLE, payload: ['all'] };
//   return { type: FILTER_USER_ROLE, payload: selectedFilters };
// };

// export const filteredUserStack = (selectedFilters) => {
//   if (!selectedFilters.length) return { type: FILTER_USER_STACK, payload: ['all'] };
//   return { type: FILTER_USER_STACK, payload: selectedFilters };
// };

export const filteredUserName = (name) => ({ type: FILTER_USER_NAME, payload: name });

// export const filteredUserEmail = (email) => ({ type: FILTER_USER_EMAIL, payload: email });

// export const filteredUserPhone = (phone) => ({ type: FILTER_USER_PHONE, payload: phone });

// export const filteredUserEnglishLevel = (level) => {
//   if (!level.length) return { type: FILTER_USER_ENGLISH_LEVEL, payload: ['all'] };
//   return ({ type: FILTER_USER_ENGLISH_LEVEL, payload: level });
// };

export const AddUser = (user) => async (dispatch) => {
  try {
    const loginToken = localStorage.getItem('token');
    const { data } = await postUser(user, loginToken);
    dispatch({ type: ADD_USER, payload: data });
  } catch (error) {
    dispatch({ type: ADD_USER_ERROR, payload: error });
  }
};
