import transactionList from '../tests/mock/transaction.mock'
import {initialState, transaction as transactionReducer} from '../redux/transaction/transaction.reducer';
import { GET_LIST_TRANSACTION } from '../redux/transaction/transaction.constants';


describe('transactionReducer', () => {
  it('handles GET_LIST_TRANSACTION action', () => {

    const expectedState = {
      items: transactionList.slice(1,10),
      itemsFiltered: [],
      totalItems: 10,
      pageIndex: 1,
      pageSize: 5
    };


    const actualState = transactionReducer(
      initialState,
      {
        type: GET_LIST_TRANSACTION,
        payload: {
          items: transactionList.slice(1,10),
          itemsFiltered: [],
          pageIndex: 1,
          pageSize: 5,
          totalItems: 10,
        }
      }
    );

    expect(expectedState).toEqual(actualState);
  });
});
