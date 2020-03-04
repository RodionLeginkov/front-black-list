import { combineReducers } from 'redux';
import projectReducer from './projectReducer/project';


const rootReducers = combineReducers({
  projects: projectReducer,
});

export default rootReducers;
