import { getAll as getAllPosts} from '../utils/api-server/posts'
import { getAll as getAllCategories} from '../utils/api-server/categories'
import { receivePosts } from './posts'
import { receiveCategories } from './categories'

export function handleGetAllPosts () {
    return (dispatch) => {
        return getAllPosts().
            then(({ posts }) => {
                dispatch(receivePosts(posts))
            })
    }
}

export function handleGetAllCategories () {
    return (dispatch) => {
        return getAllCategories().
            then(({ categories }) => {
                dispatch(receiveCategories(categories))
            })
    }
}
