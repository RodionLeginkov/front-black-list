import { combineReducers } from 'redux';
import projectReducer from './projectReducer/projectReducer';


const rootReducers = combineReducers({
  projects: projectReducer,
});

export default rootReducers;
