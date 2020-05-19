import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import TableContainer from '@material-ui/core/TableContainer';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArchivedMilestonesTableRow from '../ArchivedMilestonesTableRow/ArchivedMilestonesTableRow';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#32418c',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function createData(milestone) {
  return { ...milestone };
}

const ArchivedMilestonesTable = (props) => {
  const classes = useStyles();
  const { milestones, archived } = props;
  const rows = milestones.filter((milestone) => milestone.status === 'Archived');

  console.log('rows', rows);
  console.log('archive', archived);
  return (
    <>
      <TableContainer component={Paper} style={{ marginRight: 20 }}>
        <Table className={classes.table}>
          <TableHead color='primary'>
            <TableRow>

              <StyledTableCell align="center"> Project</StyledTableCell>
              <StyledTableCell align="center"> Role</StyledTableCell>
              <StyledTableCell align="center"> Load</StyledTableCell>
              <StyledTableCell align="center"> Start Date</StyledTableCell>
              <StyledTableCell align="center"> End Date</StyledTableCell>
              <StyledTableCell align="center"> Comment</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archived ? (rows.map((item) => (
              <ArchivedMilestonesTableRow
                milestone={item}
                key={Math.random()}
              />
            ))) : ''}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ArchivedMilestonesTable;