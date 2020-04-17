import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Select from '@material-ui/core/Select';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import { userRoles, userTableCells } from '../../constants/constants';
import UserTableRow from '../UserTableRow/UserTableRow.jsx';
import TableOrder from '../TableOrder/TableOrder.jsx';
import '../../Pages/UsersPage/UsersPage.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#32418c',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function UserTableCell(props) {
  const {
    order, setOrder, sort, setSort, cell,
  } = props;
  return (
    <>
      <StyledTableCell
        className='cell-pointer cell'
        align="center"
        onClick={() => setSort(cell.value)}
      >

        {cell.label}
        <TableOrder
          order={order}
          setOrder={setOrder}
          cell={cell.value}
          sort={sort}
        />


      </StyledTableCell>
    </>
  );
}

export default UserTableCell;
