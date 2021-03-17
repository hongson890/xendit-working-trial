import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Menu, MenuItem } from '@material-ui/core';
import { IconFlagDE, IconFlagUK } from 'material-ui-flags';
import PublicIcon from '@material-ui/icons/Public';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const btnStyle = {
  marginRight: '16px'
};

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    // localStorage.setItem('lang', lng);
  };

  return (
    <div className="LanguageSelector">
      <Button
        style={btnStyle}
        endIcon={<ExpandMoreIcon style={{ color: '#7C7C7C' }} />}
        onClick={handleClick}
      >
        <PublicIcon />
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            changeLanguage('en');
          }}
        >
          <IconFlagUK />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            changeLanguage('de');
          }}
        >
          <IconFlagDE />
        </MenuItem>
      </Menu>
      {/* <Button style={btnStyle} onClick={() => changeLanguage('en')}><IconFlagUK /></Button>
      <Button onClick={() => changeLanguage('de')}><IconFlagDE /></Button> */}
    </div>
  );
}
