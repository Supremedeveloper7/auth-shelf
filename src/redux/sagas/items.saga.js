import axios from "axios";
import {put} from 'redux-saga/effects';

function* fetchAllItems() {
    try{
        const response = yield axios.get('/api/shelf');
        yield put({ type: 'SET_ITEMS', payload: response.data})
    } catch(error) {
        console.log(`error in getting items`, error);
    }
}


export default fetchAllItems;