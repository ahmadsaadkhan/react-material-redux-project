import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../contants/actionTypes';

export default (posts = [], action) => {
    switch (action.type) {
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        case UPDATE:
            return posts.map((post) => posts.id === action.payload.id ? action.payload : post)
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        default:
            return posts;
    }
}