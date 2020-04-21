import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableSortLabel } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#32418C',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(createDate, authorName, text) {
  return {
    createDate, authorName, text,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 650,
  },
});


export default function TasksTable(props) {
  const { tasks } = props;
  const classes = useStyles();

  const users = useSelector((state) => state.users.users);
  const rows = tasks.map((task) => {
    let createDate = new Date(task.createdAt);
    createDate = createDate.toLocaleString('en-US', { hour12: false });
    const authorName = !users.length || users.find((user) => task.creator_uuid === user.uuid).fullName;

    return createData(createDate, authorName, task.text);
  });

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead color='#32418C'>
          <TableRow>
            <StyledTableCell>Task</StyledTableCell>
            <StyledTableCell align="right">Author</StyledTableCell>
            <StyledTableCell align="right">Date of creation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={Math.random()}>
              <StyledTableCell component="th" scope="row">
                <Typography variant="inherit">
                  {row.text === null || row.text.split('\n').map((i, key) => <div key={key}>{i}</div>)}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">{row.authorName}</StyledTableCell>
              <StyledTableCell align="right">
                {' '}
                <TableSortLabel direction="asc" />
                {row.createDate}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
