import { transaction as transactionReducer } from '../redux/transaction/transaction.reducer';
import { GET_LIST_TRANSACTION } from '../redux/transaction/transaction.constants';

describe('transactionReducer', () => {
  it('handles SUCCESS action', () => {
    const expectedState = {
      type: GET_LIST_TRANSACTION
    };

    const actualState = transactionReducer(
      {},
      { type: GET_LIST_TRANSACTION, message: 'success message' }
    );

    expect(expectedState).toEqual(actualState);
  });
});
