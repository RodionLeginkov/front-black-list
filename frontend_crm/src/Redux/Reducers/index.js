import { combineReducers } from 'redux';
import projectReducer from './projectReducer/projectReducer';
import userReducer from './userReducer';
import authReducer from './authReducer/authReducer';

const rootReducers = combineReducers({
  projects: projectReducer,
  users: userReducer,
  auth: authReducer,
});

export default rootReducers;
