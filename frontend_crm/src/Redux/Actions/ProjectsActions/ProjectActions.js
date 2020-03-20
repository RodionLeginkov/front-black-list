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
  LOAD_CURRENT_PROJECT, LOAD_CURRENT_PROJECT_SUCCESS,
} from '../../ActionTypes/projectsTypes/projectsTypes';

// import { addNewProject } from './ProjectsApi';

// eslint-disable-next-line import/prefer-default-export
export const addProject = (project) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PROJECT_BEGIN });
    const loginToken = localStorage.getItem('token');
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_API}project/addproject`, { data: project }, { headers: { token: loginToken } });
    dispatch({ type: ADD_PROJECT, payload: data });
  } catch (error) {
    dispatch({ type: ADD_RPOJECT_ERROR, payload: error });
  }
};


export const getProjects = () => async (dispatch) => {
  try {
    // if (localStorage.getItem('admin') === 'true') {
    dispatch({ type: LOAD_RPOJECT });
    const loginToken = localStorage.getItem('token');
    // console.log(loginToken);
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}project`, { headers: { token: loginToken } });
    dispatch({ type: LOAD_RPOJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_RPOJECT_ERROR, payload: error });
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

export const filteredProjects = (filters) => ({ type: FILTER_PROJECT, payload: filters });

// export const fileredPro