import { NotificationManager } from 'react-notifications';
import { postMilestone, deleteMilestones, updateMilestones } from './MilestonesApi';
import {
  POST_MILESTONE_ERROR,
  POST_MILESTONE_SUCCESS,
  POST_MILESTONE,
  DELETE_MILESTONE_ERROR,
  DELETE_MILESTONE_SUCCESS,
  DELETE_MILESTONE,
  UPDATE_MILESTONE,
  UPDATE_MILESTONE_SUCCESS,
  UPDATE_MILESTONE_ERROR,
} from '../../ActionTypes/milestonesTypes/milestonesTypes';


export const addMilestone = (milestone) => async (dispatch) => {
  try {
    dispatch({ type: POST_MILESTONE });
    const { data } = await postMilestone(milestone);
    NotificationManager.success('The resource was created');
    dispatch({ type: POST_MILESTONE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_MILESTONE_ERROR, payload: error });
  }
};

export const deleteMilestone = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MILESTONE });
    await deleteMilestones(id);
    NotificationManager.success('The resource was deleted');
    dispatch({ type: DELETE_MILESTONE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_MILESTONE_ERROR, payload: error });
  }
};


export const updateMilestone = (milestone) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_MILESTONE });
    const { data } = await updateMilestones(milestone, milestone.uuid);
    NotificationManager.success('The resource was updated');
    dispatch({ type: UPDATE_MILESTONE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_MILESTONE_ERROR, payload: error });
  }
};
