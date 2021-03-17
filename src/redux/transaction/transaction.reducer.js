import { GET_LIST_TRANSACTION } from './transaction.constants';

export const initialState = {
  items: [],
  itemsFiltered: [],
  totalItems: 0,
  pageIndex: 0,
  pageSize: 5
};

export function transaction(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_TRANSACTION:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
