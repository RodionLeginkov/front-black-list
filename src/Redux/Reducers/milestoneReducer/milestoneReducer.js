import produce from 'immer';
import {
  POST_MILESTONE_ERROR,
  POST_MILESTONE_SUCCESS,
  POST_MILESTONE,
  DELETE_MILESTONE_ERROR,
  DELETE_MILESTONE_SUCCESS,
  UPDATE_MILESTONE,
  UPDATE_MILESTONE_SUCCESS,
  UPDATE_MILESTONE_ERROR,
} from '../../ActionTypes/milestonesTypes/milestonesTypes';

const initialState = {
  milestones: [],
  addingMilestonesError: false,
  addingMilestones: false,
  deleteMilestonError: false,
};

const milestoneReducer = produce((draft, action) => {
  switch (action.type) {
    case POST_MILESTONE:
      draft.addingMilestones = true;
      return draft;

    case POST_MILESTONE_SUCCESS:
      draft.addingMilestones = false;
      draft.milestones = [...draft.milestones, action.payload];
      return draft;

    case POST_MILESTONE_ERROR:
      draft.addingMilestonesError = true;
      return draft;

    case DELETE_MILESTONE_ERROR:
      draft.deleteMilestonError = true;
      return draft;

    case DELETE_MILESTONE_SUCCESS:
      draft.milestones = draft.milestones.filter((m) => m.uuid !== action.payload);
      return draft;

    case UPDATE_MILESTONE:
      return draft;
    case UPDATE_MILESTONE_SUCCESS:
      return draft;
    case UPDATE_MILESTONE_ERROR:
      return draft;
    default:
      return draft;
  }
}, initialState);

export default milestoneReducer;
