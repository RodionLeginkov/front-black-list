import produce from 'immer';
import {
  LOAD_USER, LOAD_USER_SUCCESS, LOAD_CURRENT_USER, CURRENT_USER, FIND_USER, DELETE_USER,
  DELETE_USER_ERROR, FILTER_USER_ROLE, LOAD_CURRENT_USER_SUCCESS, FILTER_USER_NAME,
  FILTER_USER_EMAIL, EDIT_USER, FILTER_USER_STACK, FILTER_USER_PHONE,
  FILTER_USER_ENGLISH_LEVEL,
} from '../../ActionTypes/usersTypes/usersTypes';

const initialState = {
  users: [],
  filteredUsers: [],
  loadingUsers: false,
  loadingCurrentUser: false,
  currentUser: null,
  deleteUserError: false,
  filters: {
    name: '',
    skill: [],
    role: ['all'],
    stack: ['all'],
    englishLevel: ['all'],
    email: '',
    phone: '',
  },
};

const userReducer = produce((draft, action) => {
  switch (action.type) {
    case DELETE_USER:
      draft.users = draft.users.filter((user) => user._id !== action.payload);
      draft.filteredUsers = draft.users.filter((user) => user._id !== action.payload);
      return draft;

    case DELETE_USER_ERROR:
      draft.deleteUserError = true;
      return draft;

    case LOAD_USER:
      draft.loadingUsers = true;
      return draft;
    case LOAD_USER_SUCCESS:
      draft.users = action.payload;
      draft.filteredUsers = action.payload;
      draft.loadingUsers = false;
      return draft;

    case LOAD_CURRENT_USER:
      draft.loadingCurrentUser = true;
      return draft;

    case LOAD_CURRENT_USER_SUCCESS:
      draft.currentUser = action.payload;
      draft.loadingCurrentUser = false;
      return draft;

    case CURRENT_USER:
      draft.users = action.payload;
      draft.loadingCurrentUser = false;
      return draft;

    case EDIT_USER:
      draft.users[draft.users.findIndex((user) =>
        user._id === action.payload._id)] = action.payload;
      draft.currentUser = action.payload;
      return draft;

    case FIND_USER:
      draft.currentUser = draft.users.find((user) => user._id === action.payload);
      return draft;

    case FILTER_USER_ROLE:
      draft.filters.role = action.payload;
      return draft;

    case FILTER_USER_STACK:
      draft.filters.stack = action.payload;
      return draft;

    case FILTER_USER_NAME:
      draft.filters.name = action.payload;
      return draft;

    case FILTER_USER_PHONE:
      draft.filters.phone = action.payload;
      return draft;

    case FILTER_USER_ENGLISH_LEVEL:
      draft.filters.englishLevel = action.payload;
      return draft;

    case FILTER_USER_EMAIL:
      draft.filters.email = action.payload;
      return draft;

    default:
      return draft;
  }
}, initialState);

export default userReducer;
