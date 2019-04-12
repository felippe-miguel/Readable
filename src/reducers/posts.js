import { RECEIVE_POSTS, VOTE_POST, UPDATE_POST, ADD_POST, DELETE_POST } from '../actions/posts'

export default function posts (state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS :
            return {
                ...state,
                ...action.posts
            }
        case VOTE_POST :
            return {
                ...state,
                [action.postKey]: {
                    ...state[action.postKey],
                    voteScore: state[action.postKey].voteScore + (action.option === 'upVote' ? 1 : -1)
                }
            }
        case UPDATE_POST :
            return {
                ...state,
                [action.postKey]: {
                    ...action.post,
                }
            }
        case ADD_POST :
            return {
                ...state,
                [Object.keys(state).length]: {
                    ...action.post
                }
            }
        case DELETE_POST :
            let newState = Object.assign(state)
            delete newState[action.postKey]

            return {
                ...newState,
            }
        default :
            return state
    }
}