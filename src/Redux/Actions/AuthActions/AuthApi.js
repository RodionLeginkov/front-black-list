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


export const signUpNewUser = (data) => signUp('/signup', data);

export const loginUser = (data) => signin('/signin', data);

export const inviteUser = (data) => invite('/v1/reset', data);
