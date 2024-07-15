import {
    FETCH_ITEMS_REQUEST,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_FAILURE,
    ADD_ITEM_SUCCESS,
    UPDATE_ITEM_SUCCESS,
    DELETE_ITEM_SUCCESS,
    Item,
    FetchItemsSuccessPayload,
    FetchItemsFailurePayload,
  } from '../actions/itemActions';
  
  interface ItemState {
    items: Item[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: ItemState = {
    items: [],
    loading: false,
    error: null,
  };
  
  const itemReducer = (state = initialState, action: any): ItemState => {
    switch (action.type) {
      case FETCH_ITEMS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_ITEMS_SUCCESS:
        return { ...state, loading: false, items: (action.payload as FetchItemsSuccessPayload).items };
      case FETCH_ITEMS_FAILURE:
        return { ...state, loading: false, error: (action.payload as FetchItemsFailurePayload).error };
      case ADD_ITEM_SUCCESS:
        return { ...state, items: [...state.items, action.payload as Item] };
      case UPDATE_ITEM_SUCCESS:
        return {
          ...state,
          items: state.items.map(item => item.id === (action.payload as Item).id ? action.payload : item),
        };
      case DELETE_ITEM_SUCCESS:
        return {
          ...state,
          items: state.items.filter(item => item.id !== (action.payload as number)),
        };
      default:
        return state;
    }
  };
  
  export default itemReducer;
  