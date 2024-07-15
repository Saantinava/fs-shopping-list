export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';
export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';
export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';
export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

export interface Item {
  id: number;
  name: string;
  description: string;
  quantity: number;
}

export interface ItemInputData {
  name: string;
  description: string;
  quantity: number;
}

export interface FetchItemsSuccessPayload {
  items: Item[];
}

export interface FetchItemsFailurePayload {
  error: string;
}

export const fetchItemsRequest = () => ({ type: FETCH_ITEMS_REQUEST });
export const fetchItemsSuccess = (items: Item[]) => ({ type: FETCH_ITEMS_SUCCESS, payload: { items } });
export const fetchItemsFailure = (error: string) => ({ type: FETCH_ITEMS_FAILURE, payload: { error } });

export const addItemRequest = (item: ItemInputData) => ({ type: ADD_ITEM_REQUEST, payload: item });
export const addItemSuccess = (item: ItemInputData) => ({ type: ADD_ITEM_SUCCESS, payload: item });
export const addItemFailure = (error: string) => ({ type: ADD_ITEM_FAILURE, payload: { error } });

export const updateItemRequest = (item: Item) => ({ type: UPDATE_ITEM_REQUEST, payload: item });
export const updateItemSuccess = (item: Item) => ({ type: UPDATE_ITEM_SUCCESS, payload: item });
export const updateItemFailure = (error: string) => ({ type: UPDATE_ITEM_FAILURE, payload: { error } });

export const deleteItemRequest = (id: number) => ({ type: DELETE_ITEM_REQUEST, payload: id });
export const deleteItemSuccess = (id: number) => ({ type: DELETE_ITEM_SUCCESS, payload: id });
export const deleteItemFailure = (error: string) => ({ type: DELETE_ITEM_FAILURE, payload: { error } });
