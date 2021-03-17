import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import theme from 'src/theme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { history } from './helpers';
import { RouteWrapper } from './components/RouteWrapper';
import DashboardLayout from './layouts/DashboardLayout';
import GlobalStyles from './components/GlobalStyles';
import NotFoundView from './views/errors/NotFoundView';
import TransactionListView from './views/dashboard/TransactionListView';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router history={history}>
            <Switch>
              <RouteWrapper path="/" component={TransactionListView} layout={DashboardLayout} />
              <Route component={NotFoundView} />
            </Switch>
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
