import axios from 'axios';
import {put} from 'redux-saga/effects';

function* addBookSaga(action) {
    try {
        yield axios.post('/api/shelf', {description: action.payload.description, image_url: action.payload.image_url,
        user_id: action.payload.user_id});
        yield put({type: 'FETCH_ITEMS'});
    } catch (error) {
        console.log(error);
    }
}


export default addBookSaga;