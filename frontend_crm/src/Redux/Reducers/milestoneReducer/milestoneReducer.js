import produce from 'immer';
import {
    POST_MILESTONE_ERROR,
    POST_MILESTONE_SUCCESS,
    POST_MILESTONE
} from '../../ActionTypes/milestonesTypes/milestonesTypes'

const initialState = {
    milestones: [],
    addingMilestonesError: false,
    addingMilestones: false,
}

const milestoneReducer = produce((draft, action) => {
    switch (action.type) {
        case POST_MILESTONE:
            draft.addingMilestones = true;
            return draft;
        case POST_MILESTONE_SUCCESS:
            draft.addingMilestones = false;
            draft.projects = [...draft.milestones, action.payload]
            return draft;
        case POST_MILESTONE_ERROR:
            draft.addingMilestonesError = true;
            return draft;
    }
}, initialState)

export default milestoneReducer