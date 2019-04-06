import { votePost, addPost, deletePost } from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

function disablePost (postKey) {
    return {
        type: DELETE_POST,
        postKey
    }
}

export function handleDeletePost (data) {
    return (dispatch) => {
        return deletePost(
            data.postId
        ).then(dispatch(disablePost(data.postKey)))
    }
}

function addNewPost (post) {
    return {
        type: ADD_POST,
        post
    }
}

export function handleAddNewPost (data) {
    return (dispatch) => {
        return addPost(
            data
        ).then((post) => dispatch(addNewPost(post)))
    }
}

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