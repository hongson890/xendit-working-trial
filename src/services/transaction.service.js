import _mock from 'src/views/dashboard/TransactionListView/data';

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (
      !Object.prototype.hasOwnProperty.call(a, key) ||
      !Object.prototype.hasOwnProperty.call(b, key)
    ) {
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
}

function paginate(array, pageSize, pageIndex) {
  return array.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
}

function getListTransaction(
  pageIndex = 1,
  pageSize = 5,
  filter = null,
  sort = { orderType: 'asc', orderBy: 'dateUpdated' },
  _itemsFiltered = []
) {
  let transactionList = _itemsFiltered.length > 0 ? _itemsFiltered : _mock;
  let itemsFiltered = [];
  let totalItems = _mock.length;

  if (filter) {
    transactionList = transactionList.filter(item => {
      let isExist = false;
      for (let key in filter) {
        if (item[key] && (item[key] + '').toLowerCase().includes((filter[key] + '').toLowerCase())) {
          isExist = true;
          break;
        }
      }
      return isExist;
    });
    itemsFiltered = transactionList;
    totalItems = _itemsFiltered.length === 0 ? transactionList.length : _mock.length;
  } else {
    transactionList = _mock;
  }

  if (transactionList.length > 0) {
    transactionList = paginate(
      transactionList.sort(compareValues(sort.orderBy, sort.orderType)),
      pageSize > _mock.length ? _mock.length : pageSize,
      pageIndex
    );
  }

  return {
    items: transactionList,
    pageIndex,
    pageSize,
    totalItems,
    itemsFiltered
  };
}

export const transactionService = {
  getListTransaction
};
