import axios from 'axios';
import { patchProject, loadProject } from './ProjectsApi';
import {

  ADD_PROJECT, ADD_PROJECT_BEGIN, ADD_RPOJECT_ERROR, DELETE_PROJECT,
  LOAD_RPOJECT, FILTER_PROJECT,
  LOAD_RPOJECT_SUCCESS, EDIT_PROJECT_DEVELOPERS_ERROR,
  LOAD_RPOJECT_ERROR, EDIT_PROJECT_DEVELOPERS,
  FIND_PROJECT, DELETE_PROJECT_ERROR,
  EDIT_PROJECT, EDIT_PROJECT_ERROR,
  LOAD_PROJECT_ERROR, FILTER_PROJECT_NAME,
  LOAD_CURRENT_PROJECT, LOAD_CURRENT_PROJECT_SUCCESS, FILTER_PROJECT_STACK,
  FILTER_PROJECT_STATUS, FILTER_PROJECT_DURATION,
  FILTER_PROJECT_PAYMENT_TYPE ,
  FILTER_PROJECT_MESSENGER,
  FILTER_PROJECT_FORMAT_OF_COMUNICATUIN
} from '../../ActionTypes/projectsTypes/projectsTypes';

// import { addNewProject } from './ProjectsApi';

// eslint-disable-next-line import/prefer-default-export
export const addProject = (project) => async (dispatch) => {
  try {
    console.log("SFJHASFSADFHSUJFDHAUJS")
    // console.log('PROJECT', project);
    dispatch({ type: ADD_PROJECT_BEGIN });
    const loginToken = localStorage.getItem('token');
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_API}project/addproject`, project, { headers: { token: loginToken } });
    dispatch({ type: ADD_PROJECT, payload: data });
  } catch (error) {
    dispatch({ type: ADD_RPOJECT_ERROR, payload: error });
  }
};


export const getProjects = () => async (dispatch) => {
  try {
    // if (localStorage.getItem('admin') === 'true') {
    // console.log("SFJHASFSADFHSUJFDHAUJS")
    dispatch({ type: LOAD_RPOJECT });
    const loginToken = localStorage.getItem('token');
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}project`, { headers: { token: loginToken } });
    dispatch({ type: LOAD_RPOJECT_SUCCESS, payload: data });
  } catch (error) {
    // console.log("ERROR")
    dispatch({ type: LOAD_PROJECT_ERROR, payload: error });
  }
};

export const getProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_CURRENT_PROJECT });
    const loginToken = localStorage.getItem('token');
    const { data } = await loadProject(id, { headers: { token: loginToken } });
    dispatch({ type: LOAD_CURRENT_PROJECT_SUCCESS, payload: data.project[0] });
  } catch (error) {
    dispatch({ type: LOAD_PROJECT_ERROR, payload: error });
  }
};

export const findProject = (id) => ({ type: FIND_PROJECT, payload: id });

export const deleteProject = (id) => async (dispatch) => {
  try {
    const loginToken = localStorage.getItem('token');
    await axios.delete(`${process.env.REACT_APP_BASE_API}project/${id}`, { headers: { token: loginToken } });
    dispatch({ type: DELETE_PROJECT, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_PROJECT_ERROR, payload: error });
  }
};

export const updateProject = (project) => async (dispatch) => {
  try {
    const loginToken = localStorage.getItem('token');
    // console.log(loginToken);
    const { data } = await patchProject(project, { headers: { token: loginToken } });
    dispatch({ type: EDIT_PROJECT, payload: data[0] });
  } catch (error) {
    dispatch({ type: EDIT_PROJECT_ERROR, payload: error });
  }
};

export const updateProjectDevelopers = (project) => async (dispatch) => {
  try {
    const loginToken = localStorage.getItem('token');
    const { data } = await patchProject(project, { headers: { token: loginToken } });
    dispatch({ type: EDIT_PROJECT_DEVELOPERS, payload: data[0] });
  } catch (error) {
    dispatch({ type: EDIT_PROJECT_DEVELOPERS_ERROR, payload: error });
  }
};

export const filteredProjectName = (name) => ({ type: FILTER_PROJECT_NAME, payload: name });

export const filteredProjectStack = (selectedFilters) => {
  if (!selectedFilters.length) return { type: FILTER_PROJECT_STACK, payload: ['all'] }
  return { type: FILTER_PROJECT_STACK, payload: selectedFilters }
}

export const filteredProjectStatus = (selectedFilters) => {
  if (!selectedFilters.length) return { type: FILTER_PROJECT_STATUS, payload: ['all'] }
  return { type: FILTER_PROJECT_STATUS, payload: selectedFilters }
}

export const filteredProjectDuration = (selectedFilters) => {
  if (!selectedFilters.length) return { type: FILTER_PROJECT_DURATION, payload: ['all'] }
  return { type: FILTER_PROJECT_DURATION, payload: selectedFilters }
}

export const filteredProjectPaymentType = (selectedFilters) => { 
  if(!selectedFilters.length) return {type: FILTER_PROJECT_PAYMENT_TYPE , payload: ['all']}
  return {type: FILTER_PROJECT_PAYMENT_TYPE, payload: selectedFilters}
}

export const filteredProjectMessenger = (selectedFilters) => {
  if(!selectedFilters.length) return {type: FILTER_PROJECT_MESSENGER , payload: ['all']}
  return {type: FILTER_PROJECT_MESSENGER, payload: selectedFilters}
}

export const filteredProjectCommunication = (selectedFilters) => {
  console.log(selectedFilters)
  if(!selectedFilters.length) return {type: FILTER_PROJECT_FORMAT_OF_COMUNICATUIN, payload: ['all']}
  return {type: FILTER_PROJECT_FORMAT_OF_COMUNICATUIN, payload: selectedFilters}
}