import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_ITEMS_REQUEST,
  fetchItemsSuccess,
  fetchItemsFailure,
  ADD_ITEM_REQUEST,
  addItemSuccess,
  addItemFailure,
  UPDATE_ITEM_REQUEST,
  updateItemSuccess,
  updateItemFailure,
  DELETE_ITEM_REQUEST,
  deleteItemSuccess,
  deleteItemFailure,
  Item,
} from '../actions/itemActions';

function* fetchItems() {
    try {
      const response: { data: Item[] } = yield call(axios.get, "localhost:5001/api/items");
      yield put(fetchItemsSuccess(response.data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        yield put(fetchItemsFailure(error.message));
      } else {
        yield put(fetchItemsFailure("An unknown error occurred"));
      }
    }
  }
  
  function* addItem(action: { type: typeof ADD_ITEM_REQUEST; payload: Item }) {
    try {
      const response: { data: Item } = yield call(axios.post, "localhost:5001/api/items", action.payload);
      yield put(addItemSuccess(response.data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        yield put(addItemFailure(error.message));
      } else {
        yield put(addItemFailure("An unknown error occurred"));
      }
    }
  }
  
  function* updateItem(action: { type: typeof UPDATE_ITEM_REQUEST; payload: Item }) {
    try {
      const response: { data: Item } = yield call(axios.put, `/api/items/${action.payload.id}`, action.payload);
      yield put(updateItemSuccess(response.data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        yield put(updateItemFailure(error.message));
      } else {
        yield put(updateItemFailure("An unknown error occurred"));
      }
    }
  }
  
  function* deleteItem(action: { type: typeof DELETE_ITEM_REQUEST; payload: number }) {
    try {
      yield call(axios.delete, `/api/items/${action.payload}`);
      yield put(deleteItemSuccess(action.payload));
    } catch (error: unknown) {
      if (error instanceof Error) {
        yield put(deleteItemFailure(error.message));
      } else {
        yield put(deleteItemFailure("An unknown error occurred"));
      }
    }
  }

export default function* itemSagas() {
  yield takeLatest(FETCH_ITEMS_REQUEST, fetchItems);
  yield takeLatest(ADD_ITEM_REQUEST, addItem);
  yield takeLatest(UPDATE_ITEM_REQUEST, updateItem);
  yield takeLatest(DELETE_ITEM_REQUEST, deleteItem);
}
