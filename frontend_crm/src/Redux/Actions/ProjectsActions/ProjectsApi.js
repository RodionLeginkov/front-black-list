import axios from 'axios';

async function postData(url, data) {
  const response = await axios.post(url, data);
  return response;
}

async function getData(url, data) {
  const response = await axios.get(url, data);
  return response;
}


// eslint-disable-next-line import/prefer-default-export
export const addNewProject = (project) => postData('http://localhost:5000/project/addproject', project);

// eslint-disable-next-line import/prefer-default-export
export const loadAllProjects = (project) => getData('http://localhost:5000/project/', project);
