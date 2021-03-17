import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  makeStyles,
  Menu,
  Divider,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  menu: {
    '& .MuiPopover-paper': {
      marginTop: theme.spacing(1)
    }
  }
}));

const Filter = ({
  anchorEl,
  handleClose,
  filterData: filter,
  setFilterData,
  setFilterLength,
  onFilter,
  ...rest
}) => {
  const classes = useStyles();

  const handleChange = event => {
    setFilterData({ ...filter, [event.target.name]: event.target.checked });
  };

  const clearFilter = () => {
    let _filter = filter;
    for (let key in filter) {
      _filter[key] = false;
    }
    setFilterData(_filter);
    setFilterLength(0);
    // onFilter();
    handleClose();
  };

  const applyFilter = () => {
    let _filterLength = 0;
    for (let key in filter) {
      if (filter[key]) _filterLength += 1;
    }
    setFilterLength(_filterLength);
    onFilter();
    handleClose();
  };

  return (
    <Menu
      id="filter-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      className={classes.menu}
      {...rest}
    >
      <Box style={{ minWidth: '70em' }}>
        <Box
          fullWidth
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          ml={2}
          mb={2}
        >
          <Button
            variant="outlined"
            color="primary"
            className={classes.btn}
            onClick={clearFilter}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={applyFilter}
          >
            Apply filter
          </Button>
        </Box>
        <Divider />
        <Divider />
        <Box
          fullWidth
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          ml={2}
          mr={2}
        >
          <Box display="flex" flexDirection="column" p={2}>
            <Box>MONEY IN STATUS</Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.moneyInStatusSettled}
                  onChange={handleChange}
                  name="moneyInStatusSettled"
                  color="primary"
                />
              }
              label="Settled"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.moneyInStatusPaid}
                  onChange={handleChange}
                  name="moneyInStatusPaid"
                  color="primary"
                />
              }
              label="Paid"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.moneyInStatusFailed}
                  onChange={handleChange}
                  name="moneyInStatusFailed"
                  color="primary"
                />
              }
              label="Failed"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.moneyInStatusPending}
                  onChange={handleChange}
                  name="moneyInStatusPending"
                  color="primary"
                />
              }
              label="Pending"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.moneyInStatusRefunded}
                  onChange={handleChange}
                  name="moneyInStatusRefunded"
                  color="primary"
                />
              }
              label="Refunded"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.moneyInStatusReversed}
                  onChange={handleChange}
                  name="moneyInStatusReversed"
                  color="primary"
                />
              }
              label="Reversed"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            p={2}
            style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
            <Box>MONEY OUT STATUS</Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.moneyOutStatusCompleted}
                  onChange={handleChange}
                  name="moneyOutStatusCompleted"
                  color="primary"
                />
              }
              label="Completed"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.moneyOutStatusPending}
                  onChange={handleChange}
                  name="moneyOutStatusPending"
                  color="primary"
                />
              }
              label="Pending"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.moneyOutStatusFailed}
                  onChange={handleChange}
                  name="moneyOutStatusFailed"
                  color="primary"
                />
              }
              label="Failed"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            p={2}
            style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
            <Box>TYPE</Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.typePayment}
                  onChange={handleChange}
                  name="typePayment"
                  color="primary"
                />
              }
              label="Payment"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.typeInvoicePayment}
                  onChange={handleChange}
                  name="typeInvoicePayment"
                  color="primary"
                />
              }
              label="Invoice Payment"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.typeDisbursement}
                  onChange={handleChange}
                  name="typeDisbursement"
                  color="primary"
                />
              }
              label="Disbursement"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.typeBatchDisbursement}
                  onChange={handleChange}
                  name="typeBatchDisbursement"
                  color="primary"
                />
              }
              label="Batch Disbursement"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            p={2}
            style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
            <Box>CHANNEL</Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.channelBank}
                  onChange={handleChange}
                  name="channelBank"
                  color="primary"
                />
              }
              label="Bank"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.channelEWallet}
                  onChange={handleChange}
                  name="channelEWallet"
                  color="primary"
                />
              }
              label="eWallet"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.channelCards}
                  onChange={handleChange}
                  name="channelCards"
                  color="primary"
                />
              }
              label="Cards"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.channelRetailOutlet}
                  onChange={handleChange}
                  name="channelRetailOutlet"
                  color="primary"
                />
              }
              label="Retail Outlet"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filter?.channelDirectDebit}
                  onChange={handleChange}
                  name="channelDirectDebit"
                  color="primary"
                />
              }
              label="Direct Debit"
            />
          </Box>
        </Box>
      </Box>
    </Menu>
  );
};

Filter.propTypes = {
  className: PropTypes.string
};

export default Filter;
