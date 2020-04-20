import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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
import UserTableRow from '../../components/UserTableRow/UserTableRow.jsx';
import UserTableCell from '../../components/UserTableCell/UserTableCell.jsx';
import './UsersPage.css';


// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: '#32418c',
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

function createData(firstName,
  lastName,
  milestons,
  seniority,
  roleForFront,
  role,
  uuid,
  projectReady,
  current_task,
  total_load) {
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
    total_load,
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
  const classes = useStyles();
  const {
    users,
    sort,
    setSort,
    order,
    setOrder,
    setVisibeCells,
    visibeCells,
  } = props;

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
      user.total_load,
    );
  });

  const handleChange = (e) => {
    setVisibeCells(e.target.value);
  };
  return (
    <>
      <FormControl className='form-control'>
        <InputLabel>Cells</InputLabel>
        <Select
          name="visibeCells"
          multiple
          value={visibeCells}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
        >
          {userTableCells.map((cellName) => (

            <MenuItem key={cellName.label} value={cellName.label}>
              <Checkbox color='primary' checked={visibeCells.indexOf(cellName.label) > -1} />
              <ListItemText primary={cellName.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper} style={{ marginRight: 20 }}>
        <Table className={classes.table}>
          <TableHead color='primary'>
            <TableRow>
              {
            userTableCells.map((cell) => {
              if (visibeCells.includes(cell.label)) {
                return (
                  <UserTableCell
                    key={Math.random()}
                    order={order}
                    setOrder={setOrder}
                    sort={sort}
                    setSort={setSort}
                    cell={cell}
                  />
                );
              }
              return false;
            })
          }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((user) => (
              <UserTableRow
                key={Math.random()}
                visibeCells={visibeCells}
                user={user}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
