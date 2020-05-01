import axios from 'axios';

async function postData(url, data, token) {
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

async function patchData(url, data, token) {
  const response = await axios.put(url, data);
  return response;
}

// eslint-disable-next-line import/prefer-default-export
export const addNewProject = (project, token) => postData('/project', project);

// eslint-disable-next-line import/prefer-default-export
export const loadAllProjects = (project) => getData('/project', project);

export const deleteProject = (id) => deleteData('/project/projectId', id);

export const patchProject = (data, token) => patchData('/project/' + `${data.uuid}`, data);

export const loadProject = (id, tokens) => getData('/project/' + `${id}`);
