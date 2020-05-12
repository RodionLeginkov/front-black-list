import axios from 'axios';

async function getData(url, filterRole, filterBar, sort, order, profitable) {
  const response = await axios.get(url, {
    params: {
      filterRole, filterBar, sort, order, profitable,
    },
  });
  return response;
}

async function deleteData(url) {
  const response = await axios.delete(url);
  return response;
}

async function patchData(url, data) {
  const response = await axios.put(url, data);
  return response;
}

async function postData(url, data) {
  const response = await axios.post(url, data);
  return response;
}

// eslint-disable-next-line import/prefer-default-export
export const postUser = (data) => postData('/user', data);

export const loadAllUsers = (filterRole, filterBar, sort, order, profitable, token) => getData('/users', filterRole, filterBar, sort, order, profitable, token);

export const loadUser = (token, userId) => getData(`/user/${userId}`);

export const deletedUser = (token, userId) => deleteData(`/user/${userId}`);

export const patchUser = (token, userId, data) => patchData(`/user/${userId}`, data, token);
