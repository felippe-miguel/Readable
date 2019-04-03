import { votePost } from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_POST = 'VOTE_POST'

export function receivePosts (posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

function updateVotePost ({ postId, postKey, option }) {
    return {
        type: VOTE_POST,
        postId,
        postKey,
        option
    }
}

export function handleUpdateVotePost (data) {
    return (dispatch) => {
        dispatch(updateVotePost(data))

        return votePost(data.postId, data.option).catch((e) => {
            console.warn('Error in handleUpdateVotePost: ', e)
            alert('Ops! Something is wrong!')
        })
    }
}