import axios from 'axios';

async function postData(url, data) {
  const response = await axios.post(url, data);
  return response;
}

async function updateData(url, data) {
  const response = await axios.put(url, data);
  return response;
}

async function deleteData(url) {
  const response = await axios.delete(url);
  return response;
}

export const postMilestone = (data) => postData('/milestones', data);

export const deleteMilestones = (id) => deleteData(`/milestone/${id}`);

export const updateMilestones = (data, id) => updateData(`/milestone/${id}`, data);
