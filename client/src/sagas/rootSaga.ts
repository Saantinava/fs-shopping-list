import { all } from 'redux-saga/effects';
import itemSagas from './itemSagas';

export default function* rootSaga() {
  yield all([
    itemSagas(),
  ]);
}
