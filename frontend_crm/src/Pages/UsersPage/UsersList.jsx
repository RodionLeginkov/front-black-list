import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { findUser } from '../../Redux/Actions/UsersActions/UserActions';
import { userRoles } from '../../constants/constants';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#32418c',
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

function createData(fName, lName, milestons, seniority, role, id, project_ready, current_task) {
  return {
    fName, lName, milestons, seniority, role, id, project_ready, current_task,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginRight: 20,
  },
  button: {
    color: '#777777',
  },
});

function difDates(startDate, curDate) {
  const
    difMonth = curDate.getMonth() - startDate.getMonth();
  const difYear = curDate.getFullYear() - startDate.getFullYear();
  const difDay = curDate.getDate() - startDate.getDate();
  if (difYear * 12 + difMonth > 12 && difMonth > 0) {
    return `${difYear} year(s) ${difMonth} month(s)`;
  }
  if (difYear * 12 + difMonth > 12 && difMonth < 0) {
    return `${difYear - 1} year(s) ${12 + difMonth} month(s)`;
  }
  if (difYear * 12 + difMonth > 0 && difMonth > 0) {
    return `${difMonth} month(s)`;
  }
  if (difYear * 12 + difMonth > 0 && difMonth < 0) {
    return `${12 + difMonth} month(s)`;
  }

  return `${difDay} day(s)`;
}

export default function UsersList(props) {
  const classes = useStyles();
  const { users } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.filteredProjects);
  const rows = users.map((user) => {
    // console.log(user)
    const startDate = new Date(user.hiredAt);
    const curDate = new Date();
    const role = userRoles.find((item) => item.value === user.role).label;
    return createData(
      user.firstName,
      user.lastName,
      user.Users_Milestones,
      difDates(startDate, curDate),
      role,
      user.uuid,
      user.project_ready,
      user.current_task,
    );
  });

  function handleClick(id) {
    dispatch(findUser(id));
    history.push(`/user/${id}`);
  }


  return (
    <TableContainer component={Paper} style={{ marginRight: 20 }}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead color='primary'>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Current Task</StyledTableCell>
            <StyledTableCell align="right">Current project</StyledTableCell>
            <StyledTableCell align="right">Role in the project</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Current rate</StyledTableCell>
            <StyledTableCell align="right">Project Ready</StyledTableCell>
            <StyledTableCell align="right">Seniority</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((user) => (
            <StyledTableRow
              style={{ cursor: 'pointer' }}
              key={Math.random()}
              onClick={() => handleClick(user.id)}
            >
              <StyledTableCell component="th" scope="row">
                {user.fName}
                {' '}
                {user.lName}
              </StyledTableCell>
              <StyledTableCell align="right">{user.current_task}</StyledTableCell>
              <StyledTableCell align="right">
                {user.milestons.map((item) => (
                  <p key={Math.random()}>
                    {projects.map((project) => {
                      if (project.uuid === item.project_uuid) return project.name;
                    })}
                  </p>
                ))}
              </StyledTableCell>
              <StyledTableCell align="right">{user.milestons.map((item) => <p>{item.role}</p>)}</StyledTableCell>
              <StyledTableCell align="right">{user.role}</StyledTableCell>
              <StyledTableCell align="right">{user.milestons.map((item) => <p>{item.rate}</p>)}</StyledTableCell>
              <StyledTableCell align="right">
                {user.project_ready}
                %
              </StyledTableCell>

              <StyledTableCell align="right">{user.seniority}</StyledTableCell>
              {/* <StyledTableCell align="right">
                <Button className={classes.button} onClick={() => setdeleteModalIsOpen(true)}>
                  <DeleteOutlineIcon />
                </Button>
              </StyledTableCell> */}
              {/* <DeleteModal deleteModalIsOpen={deleteModalIsOpen} setdeleteModalIsOpen={setdeleteModalIsOpen} id={user.uuid} name={user.name} /> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
