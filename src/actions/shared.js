import { getPosts, getCategories } from '../utils/api'
import { receivePosts } from './posts'
import { receiveCategories } from './categories'

export function handleGetAllPosts () {
    return (dispatch) => {
        return getPosts()
        .then(( posts ) => {
            dispatch(receivePosts(posts))
        })
    }
}

export function handleGetCategories () {
    return (dispatch) => {
        return getCategories()
        .then(( categories ) => {
            dispatch(receiveCategories(categories))
        })
    }
}
