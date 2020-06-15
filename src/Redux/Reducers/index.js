import { combineReducers } from 'redux';
import projectReducer from './projectReducer/projectReducer';
import userReducer from './userReducer';
import authReducer from './authReducer/authReducer';
import milestoneReducer from './milestoneReducer/milestoneReducer'
const rootReducers = combineReducers({
  projects: projectReducer,
  users: userReducer,
  auth: authReducer,
  milestones: milestoneReducer, 
});

export default rootReducers;
