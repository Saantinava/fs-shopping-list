import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import itemSagas from '../sagas/itemSagas';
import itemReducer from '../reducers/itemReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  itemReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(itemSagas);

export default store;
export type RootState = ReturnType<typeof itemReducer>;
