import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { Search as SearchIcon } from 'react-feather';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import { transactionService } from 'src/services/transaction.service';
import { transactionActions } from 'src/redux/transaction/transaction.actions';

import Filter from './Filter';
import Export from './Export';
import ExportSent from './ExportSent';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100px'
  },

  toolbar: {
    height: '50px'
  },

  btn: {
    minHeight: 40,
    minWidth: 120,
    marginRight: theme.spacing(2)
  },

  date: {
    minHeight: 40,
    minWidth: 120,
    marginTop: 0,
    marginBottom: 0,
    marginRight: theme.spacing(2),

    '& .MuiOutlinedInput-input': {
      padding: '13px 0px 13px 14px'
    },

    '& .MuiInputAdornment-positionEnd': {
      marginLeft: 0
    },

    '& .MuiIconButton-root': {
      padding: 0
    }
  },

  inputSearch: {
    '& .MuiOutlinedInput-input': {
      padding: '12.5px 14px'
    }
  },

  exportButton: {
    minHeight: 40,
    minWidth: 100,
    marginLeft: theme.spacing(2)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const transaction = useSelector(state => state.transaction);
  const pageIndex = transaction?.pageIndex || 1;
  const pageSize = transaction?.pageSize || 5;
  const itemsFiltered = transaction?.itemsFiltered || [];

  const [anchorEl, setAnchorEl] = useState(null);
  const [showExport, setShowExport] = useState(false);
  const [showExportSent, setShowExportSent] = useState(false);
  const [filterData, setFilterData] = useState({
    moneyInStatusSettled: false,
    moneyInStatusPaid: false,
    moneyInStatusFailed: false,
    moneyInStatusPending: false,
    moneyInStatusRefunded: false,
    moneyInStatusReversed: false,
    moneyOutStatusCompleted: false,
    moneyOutStatusPending: false,
    moneyOutStatusFailed: false,
    typePayment: false,
    typeInvoicePayment: false,
    typeDisbursement: false,
    typeBatchDisbursement: false,
    channelBank: false,
    channelEWallet: false,
    channelCards: false,
    channelRetailOutlet: false,
    channelDirectDebit: false
  });
  const [filterLength, setFilterLength] = useState(0);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  });

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const convertProperty = property => {
    if (property.includes('moneyInStatus')) {
      return {
        key: 'moneyInStatus',
        value: property.slice(13).toLowerCase()
      };
    } else if (property.includes('moneyOutStatus')) {
      return {
        key: 'moneyOutStatus',
        value: property.slice(14).toLowerCase()
      };
    } else if (property.includes('type')) {
      return {
        key: 'type',
        value: property.slice(4).toLowerCase()
      };
    } else {
      return {
        key: 'channel',
        value: property.slice(7).toLowerCase()
      };
    }
  };

  const onFilter = () => {
    let _filter = {};
    for (let key in filterData) {
      if (filterData[key] === true) {
        _filter = {
          ..._filter,
          [convertProperty(key).key]: convertProperty(key).value
        };
      }
    }
    getListTransaction(_filter === {} ? null : _filter);
  };

  const getListTransaction = (filter = null) => {
    const response = transactionService.getListTransaction(
      pageIndex,
      pageSize,
      filter,
      { orderType: 'asc', orderBy: 'dateUpdated' },
      itemsFiltered
    );
    dispatch(
      transactionActions.getListTransaction(
        response.items,
        response.totalItems,
        response.pageIndex,
        response.pageSize,
        response.itemsFiltered
      )
    );
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3} className={classes.toolbar}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Button
                variant="outlined"
                className={classes.btn}
                endIcon={<ExpandMoreIcon />}
                onClick={handleClick}
              >
                Filter {filterLength > 0 ? `(${filterLength})` : ''}
              </Button>
              <KeyboardDatePicker
                className={classes.date}
                inputVariant="outlined"
                margin="normal"
                format="MM/dd/yyyy"
                value={dateRange.startDate}
                onChange={(date) => setDateRange((preDate) => {
                  return {
                    ...preDate,
                    startDate: date
                  };
                })}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
              <KeyboardDatePicker
                className={classes.date}
                inputVariant="outlined"
                margin="normal"
                format="MM/dd/yyyy"
                value={dateRange.endDate}
                onChange={(date) => setDateRange((preDate) => {
                  return {
                    ...preDate,
                    endDate: date
                  };
                })}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />

              <TextField
                fullWidth
                className={classes.inputSearch}
                onChange={event => {
                  getListTransaction(
                    event.target.value
                      ? {
                          phone: event.target.value,
                          externalId: event.target.value
                        }
                      : null
                  );
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search by phone number or external ID"
                variant="outlined"
              />
              <Button
                color="primary"
                className={classes.exportButton}
                variant="contained"
                startIcon={<CloudDownloadIcon />}
                onClick={() => setShowExport(true)}
              >
                Export
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Filter
        filterData={filterData}
        setFilterData={setFilterData}
        setFilterLength={setFilterLength}
        onFilter={onFilter}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
      <Export
        open={showExport}
        handleClose={() => setShowExport(false)}
        handleSubmit={() => {
          setShowExport(false);
          setShowExportSent(true);
        }}
      />
      <ExportSent
        open={showExportSent}
        handleClose={() => setShowExportSent(false)}
      />
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
