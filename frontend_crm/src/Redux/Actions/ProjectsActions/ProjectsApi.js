import axios from 'axios';

async function postData(url, data) {
  const response = await axios.post(url, data);
  return response;
}

async function getData(url, data) {
  const response = await axios.get(url, data);
  return response;
}

async function deleteData(url, data) {
  const response = await axios.delete(url, data);
  return response;
}

async function patchData(url, data) {
  const response = await axios.patch(url, data);
  return response;
}

// eslint-disable-next-line import/prefer-default-export
export const addNewProject = (project) => postData(`${process.env.REACT_APP_BASE_API}project/addproject`, project);

// eslint-disable-next-line import/prefer-default-export
export const loadAllProjects = (project) => getData(`${process.env.REACT_APP_BASE_API}project/`, project);

export const deleteProject = (id) => deleteData(`${process.env.REACT_APP_BASE_API}project/projectId/`, id);

export const patchProject = (data, token) => patchData(`${process.env.REACT_APP_BASE_API}project/${data._id}`, data, { headers: { token } });

export const loadProject = (id, tokens) => getData(`${process.env.REACT_APP_BASE_API}project/${id}`, tokens);
