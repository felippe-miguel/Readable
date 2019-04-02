import { getPosts } from '../utils/api'
import { receivePosts } from './posts'
import { getCategories } from '../utils/api'
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