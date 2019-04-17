import { RECEIVE_POSTS, VOTE_POST, UPDATE_POST, ADD_POST, DELETE_POST, DELETE_COMMENT_POST, COMMENT_POST } from '../actions/posts'

export default function posts (state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS :
            let posts = {}
            action.posts.map((post) => posts[post.id] = post)

            return {
                ...state,
                ...posts
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
                [action.post.id]: {
                    ...action.post
                }
            }
        case DELETE_POST :
            let newState = Object.assign(state)
            delete newState[action.postKey]

            return {
                ...newState,
            }
        case DELETE_COMMENT_POST :
            return {
                ...state,
                [action.postKey]: {
                    ...state[action.postKey],
                    commentCount: state[action.postKey].commentCount-1
                }
            }
        case COMMENT_POST :
            return {
                ...state,
                [action.postKey]: {
                    ...state[action.postKey],
                    commentCount: state[action.postKey].commentCount+1
                }
            }
        default :
            return state
    }
}