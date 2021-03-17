import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';

import Logo from 'src/components/Logo';
import LanguageSelector from '../../components/LanguageSelector';
import UserInfo from '../../components/UserInfo';

const useStyles = makeStyles(() => ({
  root: {
    color: '#000',
    backgroundColor: '#fff'
  },

  btnDocs: {
    marginRight: 8,
    textTransform: 'none',
    fontSize: 12,
    fontWeight: '500',
    color: '#7C7C7C'
  },

  btnLive: {
    marginLeft: 16,
    backgroundColor: '#f2f2f2',
    height: 25,
    width: 30,
    textTransform: 'none'
  },

  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({ className, onMobileNavOpen, logOut, ...rest }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon style={{ color: '#7C7C7C', fontSize: 20 }} />
          </IconButton>

          <RouterLink to="/">
            <Logo width={60} src="/static/xendit_white_logo.svg" />
          </RouterLink>

          <Hidden mdDown>
            <Button
              variant="contained"
              className={classes.btnLive}
              endIcon={<ExpandMoreIcon />}
              onClick={handleClick}
            >
              Live
            </Button>
          </Hidden>

          <Menu
            id="live-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Live</MenuItem>
          </Menu>
        </Box>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <Button className={classes.btnDocs}>Docs</Button>

          <Button className={classes.btnDocs}>API Reference</Button>

          <LanguageSelector />

          <UserInfo />
        </Hidden>
        <Hidden lgUp>
          <Button
            variant="contained"
            style={{ marginLeft: 16 }}
            endIcon={<ExpandMoreIcon />}
            onClick={handleClick}
          >
            Live
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  logOut: PropTypes.func
};

export default TopBar;
