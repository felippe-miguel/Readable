import { getPosts } from '../utils/api'
import { receivePosts } from './posts'

export function handleGetAllPosts () {
    return (dispatch) => {
        return getPosts()
        .then(( posts ) => {
                dispatch(receivePosts(posts))
            })
    }
}