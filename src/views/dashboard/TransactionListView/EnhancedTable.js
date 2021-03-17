import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Popover,
  TextField,
  Chip
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CloseIcon from '@material-ui/icons/Close';
import ReplyIcon from '@material-ui/icons/Reply';

import { transactionService } from 'src/services/transaction.service';
import { transactionActions } from 'src/redux/transaction/transaction.actions';

const headCells = [
  {
    id: 'status',
    numeric: false,
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'type',
    numeric: false,
    align: 'left',
    disablePadding: false,
    label: 'Type'
  },
  {
    id: 'channel',
    numeric: false,
    align: 'left',
    disablePadding: false,
    label: 'Channel'
  },
  {
    id: 'account',
    numeric: false,
    align: 'center',
    disablePadding: false,
    label: 'Account'
  },
  {
    id: 'amount',
    numeric: true,
    align: 'right',
    disablePadding: false,
    label: 'Amount'
  },
  {
    id: 'reference',
    numeric: false,
    align: 'left',
    disablePadding: false,
    label: 'Reference'
  },
  {
    id: 'dateUpdated',
    numeric: false,
    align: 'left',
    disablePadding: false,
    label: 'Date Updated'
  }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              textTransform: 'uppercase',
              fontSize: 12,
              fontWeight: 'bold'
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  title: {
    flex: '1 1 100%'
  }
}));

const EnhancedTableToolbar = props => {
  const { numSelected } = props;
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  inputCopy: {
    '& .MuiOutlinedInput-input': {
      padding: '12.5px 14px'
    }
  },
  btnCopy: {
    height: 40,
    backgroundColor: '#4573FF',
    width: 50,
    textTransform: 'none',
    borderRadiusLeft: 0
  }
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const transaction = useSelector(state => state.transaction);
  const items = transaction?.items || [];
  const totalItems = transaction?.totalItems || 0;
  const pageIndex = transaction?.pageIndex ? transaction.pageIndex - 1 : 0;
  const pageSize = transaction?.pageSize || 5;
  const itemsFiltered = transaction?.itemsFiltered || [];

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('dateUpdated');
  const [selected, setSelected] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reference, setReference] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleClickPopover = (event, ref) => {
    setCopied(false);
    setReference(ref);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setReference(null);
    setAnchorEl(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    getListTransaction(
      1,
      pageSize,
      null,
      {
        orderType: isAsc ? 'desc' : 'asc',
        orderBy: property
      },
      itemsFiltered
    );
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = items.map(n => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    getListTransaction(
      newPage + 1,
      pageSize,
      null,
      {
        orderType: order,
        orderBy: orderBy
      },
      itemsFiltered
    );
  };

  const handleChangeRowsPerPage = event => {
    getListTransaction(
      1,
      event.target.value,
      null,
      {
        orderType: order,
        orderBy: orderBy
      },
      itemsFiltered
    );
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const getListTransaction = (
    pageIndex = 1,
    pageSize = 5,
    filter = null,
    sort = { orderType: order, orderBy: orderBy },
    itemsFiltered
  ) => {
    const response = transactionService.getListTransaction(
      pageIndex,
      pageSize,
      filter,
      sort,
      itemsFiltered
    );
    console.log(response);
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

  useEffect(() => {
    getListTransaction();
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const getStatus = (status, type) => {
    if (status === 'settled' || status === 'paid') {
      return (
        <Chip
          icon={
            <DoneIcon
              style={{
                color: '#007C5C',
                fontSize: 12
              }}
            />
          }
          label={status}
          style={{
            color: '#007C5C',
            textTransform: 'capitalize',
            backgroundColor: '#bff3e6'
          }}
        />
      );
    }

    if (status === 'pending') {
      return (
        <Chip
          icon={
            <HourglassEmptyIcon
              style={{
                color: '#997207',
                fontSize: 12
              }}
            />
          }
          label={status}
          style={{
            color: '#997207',
            textTransform: 'capitalize',
            backgroundColor: '#FFE59D'
          }}
        />
      );
    }

    if (status === 'failed') {
      return (
        <Chip
          icon={
            <CloseIcon
              style={{
                color: '#E84855',
                fontSize: 12
              }}
            />
          }
          label={status}
          style={{
            color: '#E84855',
            textTransform: 'capitalize',
            backgroundColor: '#F9D1D5'
          }}
        />
      );
    }

    return (
      <Chip
        icon={
          <ReplyIcon
            style={{
              color: '#777777',
              fontSize: 12
            }}
          />
        }
        label={status}
        style={{
          color: '#777777',
          textTransform: 'capitalize',
          backgroundColor: '#ECECEC'
        }}
      />
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={pageSize}
            />
            <TableBody>
              {items.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell
                      padding="default"
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      {getStatus(row.status)}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {row.type}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {row.channel}
                    </TableCell>
                    <TableCell align="left">{row.account}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell
                      align="left"
                      onClick={e => handleClickPopover(e, row.reference)}
                    >
                      {row.reference}
                    </TableCell>
                    <TableCell align="left">
                      {moment(row.dateUpdated).format('DD MMM YYYY, h:mm a')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalItems}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box m={2} style={{ minWidth: 300 }}>
          <Box mb={1}>Reference</Box>
          <Box display="flex" alignItems="center">
            <TextField
              fullWidth
              name="reference"
              variant="outlined"
              value={reference}
              className={classes.inputCopy}
              readOnly
            />
            <CopyToClipboard text={reference} onCopy={() => setCopied(true)}>
              <Tooltip
                title={
                  copied ? 'Copied to clipboard!' : 'Click to copy to clipboard'
                }
                placement="top"
                arrow
              >
                <Button
                  disabled={copied}
                  variant="contained"
                  color="primary"
                  className={classes.btnCopy}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </Tooltip>
            </CopyToClipboard>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
