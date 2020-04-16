import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { userRoles } from '../../constants/constants';
import UserTableRow from '../../components/UserTableRow/UserTableRow.jsx';
import TableOrder from '../../components/TableOrder/TableOrder.jsx';
import './UsersPage.css';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#32418c',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function createData(firstName,
  lastName,
  milestons,
  seniority,
  roleForFront,
  role,
  uuid,
  projectReady,
  current_task) {
  return {
    firstName,
    lastName,
    milestons,
    seniority,
    roleForFront,
    role,
    uuid,
    projectReady,
    current_task,
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
  editButton: {
    color: '#777777',
    fontSize: '10px',
  },
  listComponent: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'nowrap',
  },
});

function difDates(startDate, curDate) {
  const
    difMonth = curDate.getMonth() - startDate.getMonth();
  const difYear = curDate.getFullYear() - startDate.getFullYear();
  const difDay = curDate.getDate() - startDate.getDate();
  if (curDate - startDate < 0) return 'Not started';
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
  // ///////////////////////////////////
  const classes = useStyles();
  const {
    users, sort, setSort, order, setOrder,
  } = props;
  const [selectedOrder, setSelectedOrder] = useState(false);

  const rows = users.map((user) => {
    const startDate = new Date(user.hiredAt);
    const curDate = new Date();
    const role = userRoles.find((item) => item.value === user.role).label;
    let userCurrentTask = user.UsersTasks.find((task) => user.current_task === task.uuid);
    userCurrentTask = userCurrentTask === undefined ? '' : userCurrentTask.text;
    return createData(
      user.firstName,
      user.lastName,
      user.Users_Milestones,
      difDates(startDate, curDate),
      role,
      user.role,
      user.uuid,
      user.project_ready,
      userCurrentTask,
    );
  });


  return (
    <TableContainer component={Paper} style={{ marginRight: 20 }}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead color='primary'>
          <TableRow>
            <StyledTableCell
              align="center"
              onClick={() => setSort('Name')}
            >
              Name
              <TableOrder
                order={order}
                setOrder={setOrder}
                cell="Name"
                sort={sort}
              />


            </StyledTableCell>
            <StyledTableCell align="center" onClick={() => setSort('current_task')}>
              Current Task
              <TableOrder
                order={order}
                setOrder={setOrder}
                cell="current_task"
                sort={sort}
              />
            </StyledTableCell>
            <StyledTableCell align="center">Current project</StyledTableCell>
            <StyledTableCell align="center">Role in the project</StyledTableCell>
            <StyledTableCell align="center">Current rate</StyledTableCell>
            <StyledTableCell align="center" onClick={() => setSort('Loads')}>
              Load(h/weak)
              <TableOrder
                order={order}
                setOrder={setOrder}
                cell="Loads"
                sort={sort}
              />
            </StyledTableCell>
            <StyledTableCell align="center" onClick={() => setSort('Role')}>
              Role
              <TableOrder
                order={order}
                setOrder={setOrder}
                cell="Role"
                sort={sort}
              />

            </StyledTableCell>
            <StyledTableCell align="center" onClick={() => setSort('project_ready')}>
              Project Ready
              <TableOrder
                order={order}
                setOrder={setOrder}
                cell="project_ready"
                sort={sort}
              />


            </StyledTableCell>
            <StyledTableCell align="center" onClick={() => setSort('Senioiry')}>
              Seniority
              <TableOrder
                order={order}
                setOrder={setOrder}
                cell="Senioiry"
                sort={sort}
              />


            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((user) => (<UserTableRow key={Math.random()} user={user} />))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
