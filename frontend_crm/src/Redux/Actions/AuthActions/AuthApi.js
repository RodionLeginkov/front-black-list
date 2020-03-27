import axios from 'axios';

async function signUp(url, data) {
  const response = await axios.post(url, data);
  return response;
}

async function signin(url, data) {
  const response = await axios.post(url, data);
  return response;
}

async function invite(url, data) {
  const response = await axios.post(url, data);
  return response;
}


export const signUpNewUser = (data) => signUp(`${process.env.REACT_APP_BASE_API}/signup/`, data);

export const loginUser = (data) => signin(`${process.env.REACT_APP_BASE_API}/signin/`, data);

export const inviteUser = (data) => invite(`${process.env.REACT_APP_BASE_API}/user/invitation/`, data);