import { GET_LIST_TRANSACTION } from './transaction.constants';

export const transactionActions = {
  getListTransaction
};

function getListTransaction(items, totalItems, pageIndex, pageSize, itemsFiltered) {
  return (dispatch) => {
    dispatch({ type: GET_LIST_TRANSACTION, payload: { items, totalItems, pageIndex, pageSize, itemsFiltered } });
  };
}
