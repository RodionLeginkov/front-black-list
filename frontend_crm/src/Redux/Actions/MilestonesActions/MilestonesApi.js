import axios from 'axios';

async function postData(url, data) {
  const response = await axios.post(url, data);
  return response;
}

export const postMilestone = (data) => postData(`${process.env.REACT_APP_BASE_API}milestones`, data);
