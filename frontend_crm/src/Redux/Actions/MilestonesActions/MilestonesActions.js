import {postMilestone} from './MilestonesApi';
import {
    POST_MILESTONE_ERROR,
    POST_MILESTONE_SUCCESS,
    POST_MILESTONE
} from '../../ActionTypes/milestonesTypes/milestonesTypes'


export const addMilestone = (milestone) => async (dispatch) => {
    console.log('MILE',milestone)
    try {
        dispatch({type: POST_MILESTONE})
        const {data} = await postMilestone(milestone)
        console.log('DATA', data)
        dispatch({type: POST_MILESTONE_SUCCESS, payload: data})
    }
    catch (error) {
        dispatch({type: POST_MILESTONE_ERROR, payload: error})
    }
}