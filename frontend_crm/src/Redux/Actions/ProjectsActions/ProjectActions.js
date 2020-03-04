import axios from 'axios';
import {

  ADD_PROJECT, ADD_PROJECT_BEGIN, ADD_RPOJECT_ERROR, LOAD_RPOJECT, LOAD_RPOJECT_SUCCESS, LOAD_RPOJECT_ERROR, FIND_PROJECT,
} from '../../ActionTypes/projectsTypes/projectsTypes';

// import { addNewProject } from './ProjectsApi';

// eslint-disable-next-line import/prefer-default-export
export const addProject = (project) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PROJECT_BEGIN });
    const loginToken = JSON.parse(localStorage.getItem('tokens'));
    // console.log(rerqwrqwer);
    const { data } = await axios.post('http://localhost:5000/project/addproject', { headers: { tokens: loginToken } }, { data: project });
    dispatch({ type: ADD_PROJECT, payload: data });
  } catch (error) {
    dispatch({ type: ADD_RPOJECT_ERROR, payload: error });
  }
};


export const loadProject = () => async (dispatch) => {
  try {
    // if (localStorage.getItem('admin') === 'true') {
    dispatch({ type: LOAD_RPOJECT });
    const loginToken = JSON.parse(localStorage.getItem('tokens'));
    const { data } = await axios.get('http://localhost:5000/project', { headers: { tokens: loginToken } });
    dispatch({ type: LOAD_RPOJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_RPOJECT_ERROR, payload: error });
  }
};

export const findProject = (id) => ({ type: FIND_PROJECT, payload: id });
