import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    '& h2': {
      textAlign: 'center',
      fontSize: 24,
      color: '#323232',
      fontWeight: theme.typography.fontWeightBold
    }
  },

  content: {
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '0.28571429rem'
  },

  dialogActions: {
    justifyContent: 'center',
    marginBottom: 8
  },

  btnClose: {
    textTransform: 'none',
    backgroundColor: '#4573FF'
  }
}));

const Export = ({ open, handleClose, ...rest }) => {
  const classes = useStyles();

  if (!open) return null;

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} {...rest}>
      <Box display="flex" alignItems="center" justifyContent="center" mt={5}>
        <img src="/static/icons/ic-export-send.svg" alt="" width={60} />
      </Box>
      <DialogTitle className={classes.dialogTitle}>Export Sent</DialogTitle>
      <DialogContent>
        <Box mb={2} p={2} className={classes.content}>
          <Box>Total amount to be exported</Box>
          <Box mb={2}>IDR 750.000.000</Box>
          <Box>Number of transactions to be exported</Box>
          <Box mb={2}>987</Box>
          <Box>Send to</Box>
          <Box>johnsmith@green.co</Box>
          <Box>jeremy@green.co</Box>
          <Box>matissahara@green.co</Box>
          <Box>harrisonfordman@green.co</Box>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="contained" color="primary" className={classes.btnClose} onClick={handleClose}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Export.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default Export;
