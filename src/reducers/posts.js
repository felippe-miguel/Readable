import { RECEIVE_POSTS, VOTE_POST } from '../actions/posts'

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
        default :
            return state
    }
}