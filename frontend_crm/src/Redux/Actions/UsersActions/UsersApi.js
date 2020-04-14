import axios from 'axios';

async function getData(url, filterRole, filterBar, sort, order, token) {
  const response = await axios.get(url, {
    params: {
      filterRole, filterBar, sort, order,
    },
    headers: { authorization: token },
  });
  return response;
}

async function deleteData(url, token) {
  const response = await axios.delete(url, { headers: { authorization: token } });
  return response;
}

async function patchData(url, data, token) {
  const response = await axios.put(url, data, { headers: { authorization: token } });
  return response;
}

async function postData(url, data, token) {
  const response = await axios.post(url, data, { headers: { authorization: token } });
  return response;
}

// eslint-disable-next-line import/prefer-default-export
export const postUser = (data, token) => postData(`${process.env.REACT_APP_BASE_API}user`, data, token);

export const loadAllUsers = (filterRole, filterBar, sort, order, token) => getData(`${process.env.REACT_APP_BASE_API}users/`, filterRole, filterBar, sort, order, token);

export const loadUser = (token, userId) => getData(`${process.env.REACT_APP_BASE_API}user/${userId}`, token);

export const deletedUser = (token, userId) => deleteData(`${process.env.REACT_APP_BASE_API}user/${userId}`, token);

export const patchUser = (token, userId, data) => patchData(`${process.env.REACT_APP_BASE_API}user/${userId}`, data, token);
