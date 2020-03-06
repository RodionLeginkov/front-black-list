import axios from 'axios';

async function getData(url, token) {
  const response = await axios.get(url, { headers: { tokens: token } });
  return response;
}

// eslint-disable-next-line import/prefer-default-export
export const loadAllUsers = (token) => getData(`${process.env.REACT_APP_BASE_API}users/`, token);
