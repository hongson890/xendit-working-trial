import React from 'react';

import { Box, makeStyles, Avatar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  txtUserName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7C7C7C'
  },

  txtBusinessName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7C7C7C'
  }
}));

const UserInfo = () => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <Box mr={2} align="right">
        <Box className={classes.txtUserName}>User Name</Box>
        <Box className={classes.txtBusinessName}>User Business Name</Box>
      </Box>
      <Avatar />
    </Box>
  );
};

export default UserInfo;
