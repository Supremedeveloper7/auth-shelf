import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import addBookSaga from './add.book.saga.js';
import fetchAllItems from './items.saga';
import removeItemSaga from './remove.item.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('FETCH_ITEMS', fetchAllItems);
  yield takeEvery('REMOVE_ITEM', removeItemSaga);
  yield takeEvery('ADD_BOOK', addBookSaga);
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    
  ]);
}
