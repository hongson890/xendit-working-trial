import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Home as HomeIcon } from 'react-feather';
import { Box, Drawer, Hidden, List, makeStyles } from '@material-ui/core';

import NavItem from './NavItem';

const getUserName = () => {
  const userString = localStorage.getItem('user');
  const loggedUser = userString ? JSON.parse(userString) : null;
  return !loggedUser ? 'Unknown User' : `${loggedUser.firstName} ${loggedUser.lastName}`;
};

const defaultUser = {
  avatar: '/static/images/avatars/default-avatar.png',
  jobTitle: 'Senior Developer',
  name: getUserName()
};

const items = [
  {
    href: '/home',
    icon: HomeIcon,
    title: 'nav.home'
  },
  {
    href: '/balance',
    icon: HomeIcon,
    title: 'nav.balance'
  },
  {
    href: '/',
    icon: HomeIcon,
    title: 'nav.transactions'
  },
  {
    href: '/accept-payments',
    icon: HomeIcon,
    title: 'nav.acceptPayments'
  },
  {
    href: '/send-payments',
    icon: HomeIcon,
    title: 'nav.sendPayments'
  },
  {
    href: '/callbacks',
    icon: HomeIcon,
    title: 'nav.callbacks'
  },
  {
    href: '/xen-platform',
    icon: HomeIcon,
    title: 'nav.xenPlatform'
  },
  {
    href: '/settings',
    icon: HomeIcon,
    title: 'nav.settings'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
    backgroundColor: '#4573FF'
  },

  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
    backgroundColor: '#4573FF'
  },

  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },

  typography: {
    fontSize: 12,
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [user, setUser] = useState(defaultUser);


  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname, onMobileClose, openMobile]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={t(item.title)}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
