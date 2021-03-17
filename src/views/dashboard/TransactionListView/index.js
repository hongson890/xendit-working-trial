import React from 'react';

import { Box, Container, makeStyles } from '@material-ui/core';

import Page from 'src/components/Page';

import Toolbar from './Toolbar';
import EnhancedTable from './EnhancedTable';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TransactionListView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Transaction">
      <Container maxWidth={false}>
        <Toolbar />
        <EnhancedTable />
      </Container>
    </Page>
  );
};

export default TransactionListView;
