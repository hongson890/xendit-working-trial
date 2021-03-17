import { combineReducers } from 'redux';

import { transaction } from '../redux/transaction/transaction.reducer';

const rootReducer = combineReducers({
  transaction
});

export default rootReducer;
