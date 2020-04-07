import { postMilestone, deleteMilestones } from './MilestonesApi';
import {
  POST_MILESTONE_ERROR,
  POST_MILESTONE_SUCCESS,
  POST_MILESTONE,
  DELETE_MILESTONE_ERROR,
  DELETE_MILESTONE_SUCCESS,
  DELETE_MILESTONE,
} from '../../ActionTypes/milestonesTypes/milestonesTypes';


export const addMilestone = (milestone) => async (dispatch) => {
  try {
    dispatch({ type: POST_MILESTONE });
    const { data } = await postMilestone(milestone);
    dispatch({ type: POST_MILESTONE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_MILESTONE_ERROR, payload: error });
  }
};

export const deleteMilestone = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MILESTONE });
    await deleteMilestones(id);

    dispatch({ type: DELETE_MILESTONE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_MILESTONE_ERROR, payload: error });
  }
};
