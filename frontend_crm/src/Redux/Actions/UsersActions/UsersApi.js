import axios from 'axios';

async function getData(url, filter, token) {
  const response = await axios.get(url, { params: filter }, { headers: { token } });
  return response;
}

async function deleteData(url, token) {
  const response = await axios.delete(url, { headers: { token } });
  return response;
}

async function patchData(url, data, token) {
  const response = await axios.put(url, data, { headers: { token } });
  return response;
}

// eslint-disable-next-line import/prefer-default-export

export const loadAllUsers = (filter, token) => getData(`${process.env.REACT_APP_BASE_API}/users/`, filter, token);


export const loadUser = (token, userId) => getData(`${process.env.REACT_APP_BASE_API}user/${userId}`, token);

export const deletedUser = (token, userId) => deleteData(`${process.env.REACT_APP_BASE_API}user/${userId}`, token);

export const patchUser = (token, userId, data) => patchData(`${process.env.REACT_APP_BASE_API}user/${userId}`, data, token);
