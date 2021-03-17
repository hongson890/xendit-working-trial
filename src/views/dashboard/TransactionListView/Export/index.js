import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  makeStyles,
  FormControl,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Divider
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CloseIcon from '@material-ui/icons/Close';

import { ReactMultiEmail, isEmail } from 'src/components/ReactMultiEmail';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    '& h2': {
      fontSize: 24,
      color: '#323232',
      fontWeight: theme.typography.fontWeightBold
    }
  },

  btnClose: {
    position: 'absolute',
    top: 10,
    right: 10
  },

  icClose: {
    fontSize: 24
  },

  date: {
    width: '100%',
    marginTop: 0
  },

  inputMultipleEmails: {
    minHeight: 200
  },

  content: {
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '0.28571429rem'
  },

  dialogActions: {
    justifyContent: 'center',
    marginBottom: 8
  },

  btnSendToEmail: {
    textTransform: 'none',
    backgroundColor: '#4573FF'
  }
}));

const Export = ({ open, handleClose, handleSubmit, ...rest }) => {
  const classes = useStyles();

  const [dateRangeSelect, setDateRangeSelect] = useState('Custom');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [sendToEmail, setSendToEmail] = useState([]);

  if (!open) return null;

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} {...rest}>
      <DialogTitle className={classes.dialogTitle}>Export</DialogTitle>
      <IconButton aria-label="delete" className={classes.btnClose} onClick={handleClose}>
        <CloseIcon className={classes.icClose} />
      </IconButton>
      <DialogContent>
        <Box my={2}>
          <FormControl fullWidth variant="outlined" className={classes.formControl}>
            <Box mb={1}>Date range</Box>
            <Select
              name="date-range"
              value={dateRangeSelect}
              onChange={(event) => setDateRangeSelect(event.target.value)}
            >
              <MenuItem value="Today (May 11)">Today (May 11)</MenuItem>
              <MenuItem value="This mouth (May 1 - May 11)">This mouth (May 1 - May 11)</MenuItem>
              <MenuItem value="Last 7 days (May 4 to May 10)">Last 7 days (May 4 to May 10)</MenuItem>
              <MenuItem value="Previous month (Apr 1 - Apr 30)">Previous month (Apr 1 - Apr 30)</MenuItem>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Custom" style={{ color: '#3f51b5' }}>Custom</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {dateRangeSelect === 'Custom' && (
          <Grid container flexDirection="row" spacing={3}>
            <Grid item xs={6}>
              <Box mb={1}>From</Box>
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
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Box mb={1}>To</Box>
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
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </Grid>
        )}

        <Box my={2}>
          <Box mb={1}>Send to email</Box>
          <ReactMultiEmail
            className={classes.inputMultipleEmails}
            placeholder=""
            emails={sendToEmail || []}
            onChange={setSendToEmail}
            validateEmail={(email) => isEmail(email)}
            getLabel={(email, index, removeEmail = (index) => { }) => {
              return (
                <div data-tag key={index}>
                  {email}
                  <span data-tag-handle onClick={() => removeEmail(index)}>
                    ×
                  </span>
                </div>
              );
            }}
          />
        </Box>

        <Divider />

        <Box my={2} p={2} className={classes.content}>
          <Box>Total amount to be exported</Box>
          <Box mb={2}>IDR 750.000.000</Box>
          <Box>Number of transactions to be exported</Box>
          <Box>987</Box>
        </Box>

      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button variant="contained" color="primary" className={classes.btnSendToEmail} onClick={handleSubmit}>
          Send to email
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Export.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default Export;
