/* eslint-disable no-underscore-dangle */
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
import { userRoles, userTableCells, userArchiveTableCells } from '../../constants/constants';
import UserTableRow from '../../components/UserTableRow/UserTableRow.jsx';
import UserTableHeaderCell from '../../components/UserTableHeaderCell/UserTableHeaderCell.jsx';
import './UsersPage.css';
import moment from 'moment';


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
  total_load,
  english_skill) {
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
    english_skill,
  };
}

function archiveCreateData(
  fullName,
  role,
  current_task,
  hiredAt,
  firedAt,
  uuid,
) {
  return {
    fullName,
    role,
    current_task,
    hiredAt,
    firedAt,
    uuid,
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
  const difference = moment.duration(moment(curDate).diff(moment(startDate)));
  const difYear = difference._data.years;
  const difMonth = difference._data.months;
  const difDay = difference._data.days;

  if (difYear > 0 && difMonth !== 0) return `${difYear} year(s) ${difMonth} month(s)`;
  if (difYear > 0 && difMonth === 0) return `${difYear} year(s)`;
  if (difMonth > 4) return `${difMonth} month(s)`;
  if (difMonth <= 4 && difMonth !== 0) return `${difMonth} month(s) ${difDay} day(s)`;
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
    active,
    archiveVisibleCells,
    setArchiveVisibleCells,
  } = props;


  const archiveUser = users.filter((user) => !user.isActive);

  const archiveRows = archiveUser.map((user) => {
    let startDate = 'not-started';
    let endDate = 'not-fired';
    if (user.hiredAt !== null) {
      startDate = new Date(user.hiredAt);
      startDate = startDate.toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    if (user.firedAt !== null) {
      endDate = new Date(user.firedAt);
      endDate = endDate.toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    const role = userRoles.find((item) => item.value === user.role).label;
    return (archiveCreateData(
      user.fullName,
      role,
      user.current_task,
      startDate,
      endDate,
      user.uuid,
    ));
  });

  const rows = users.map((user) => {
    const startDate = new Date(user.hiredAt);
    const curDate = new Date();
    const role = userRoles.find((item) => item.value === user.role).label;
    let userCurrentTask = user.UsersTasks[0];
    userCurrentTask = userCurrentTask === undefined ? '' : userCurrentTask.text;
    return createData(
      user.firstName,
      user.lastName,
      user.UserMilestones,
      difDates(startDate, curDate),
      role,
      user.role,
      user.uuid,
      user.project_ready,
      userCurrentTask,
      user.total_load,
      user.english_skill,
    );
  });

  const handleChange = (e) => {
    setVisibeCells(e.target.value);
  };

  const handleArchiveChange = (e) => {
    setArchiveVisibleCells(e.target.value);
  };

  return (
    <>
      <FormControl className='form-control'>
        <InputLabel>Cells</InputLabel>
        {active !== 'Archived' ? (
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
        ) : (
          <Select
            name="archiveVisibleCells"
            multiple
            value={archiveVisibleCells}
            onChange={handleArchiveChange}
            input={<Input />}
            renderValue={(selected) => selected.join(', ')}
          >
            {userArchiveTableCells.map((cellName) => (

              <MenuItem key={cellName.label} value={cellName.label}>
                <Checkbox color='primary' checked={archiveVisibleCells.indexOf(cellName.label) > -1} />
                <ListItemText primary={cellName.label} />
              </MenuItem>
            ))}
          </Select>
        )}

      </FormControl>
      <TableContainer component={Paper} style={{ marginRight: 20, maxHeight: '800px' }}>
        <Table className={classes.table} stickyHeader>
          <TableHead color='primary'>
            {active !== 'Archived' ? (
              <TableRow>
                {
            userTableCells.map((cell) => {
              if (visibeCells.includes(cell.label)) {
                return (
                  <UserTableHeaderCell
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
            ) : (
              <TableRow>
                {
                  userArchiveTableCells.map((cell) => {
                    if (archiveVisibleCells.includes(cell.label)) {
                      return (
                        <UserTableHeaderCell
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
            )}

          </TableHead>
          {active !== 'Archived' ? (
            <TableBody>
              {rows.map((user) => (
                <UserTableRow
                  key={Math.random()}
                  visibeCells={visibeCells}
                  user={user}
                />
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {archiveRows.map((user) => (
                <UserTableRow
                  key={Math.random()}
                  visibeCells={archiveVisibleCells}
                  user={user}
                  userArchiveTableCells={userArchiveTableCells}
                  archive
                />
              ))}
            </TableBody>
          )}


        </Table>
      </TableContainer>
    </>
  );
}
