import {
  LOAD_USER, LOAD_USER_SUCCESS, LOAD_CURRENT_USER, CURRENT_USER, FIND_USER, DELETE_USER,
} from '../../ActionTypes/usersTypes/usersTypes';

const initialState = {
  users: [],
  loadingUsers: false,
  loadingProjectsError: null,
  loadingCurrentProjects: false,
  currentProject: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      }
    case LOAD_USER:
      return {
        ...state,
        loadingUsers: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loadingUsers: false,
      };
    case LOAD_CURRENT_USER:
      return {
        ...state,
        loadingCurrentUser: true,
      };
    case CURRENT_USER:
      return {
        ...state,
        users: action.payload,
        loadingCurrentUser: false,
      };
    case FIND_USER:
      return {
        ...state,
        currentUser: state.users.find((user) => user._id === action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;




