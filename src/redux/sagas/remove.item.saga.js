import axios from 'axios';
import {put} from 'redux-saga/effects';


function* removeItemSaga(action) {
    try {
        yield axios.delete(`/api/shelf/${action.payload.id}`);
        yield put({type: 'FETCH_ITEMS'});
    } catch (error) {
        console.log(error);
    }
}

export default removeItemSaga;