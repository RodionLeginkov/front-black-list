import { combineReducers } from 'redux';
import projectReducer from './projectReducer/projectReducer';
import userReducer from './userReducer';

const rootReducers = combineReducers({
  projects: projectReducer,
  users: userReducer,
});

export default rootReducers;
