import axios from 'axios';

async function postData(url, data) {
  const response = await axios.post(url, data);
  return response;
}


async function deleteData(url, data) {
    const response = await axios.delete(url)
    return response;
}

export const postMilestone = (data) => postData(`${process.env.REACT_APP_BASE_API}/milestones`, data)

export const deleteMilestones = (id) => deleteData(`${process.env.REACT_APP_BASE_API}/milestone/${id}`)
