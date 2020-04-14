import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { userRoles } from '../../constants/constants';
import UserTableRowButtons from '../UserTableRowButtons/UserTableRowButtons.jsx';
import './style.css';

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
  cell: {
    padding: 4,
    '&:hover .editButton': {
      backgroundColor: '#000',
    },
  },
  raw: {
    '&:hover': {
      backgroundColor: '#DEDEDE',
      boxShadow: '0px 10px 10px 10px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    },
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      // backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const UserTableRow = ({ user }) => {
  const classes = useStyles();
  const [userRole, setUserRole] = useState(true);
  const [percent, setPercent] = useState(true);
  const [fullName, setFullName] = useState(true);
  const [curTask, setCurTask] = useState(true);
  const [changedFields, setChangedFields] = useState(user);

  const handleChange = (e) => {
    setChangedFields({ ...changedFields, [e.target.name]: e.target.value });
  };

  const devRole = userRoles.find((item) => item.value === changedFields.role).label;

  return (
    <>
      <StyledTableRow
        className={classes.raw}
        // onClick={() => handleClick(user.id)}
        style={{ cursor: 'pointer' }}
      >
        <StyledTableCell align="center" component="th" scope="row" className={classes.cell}>
          {fullName
            ? `${changedFields.firstName} ${changedFields.lastName}`
            : (
              <>
                <TextField
                  label="First name"
                  value={changedFields.firstName || ''}
                  placeholder="First name"
                  style={{ width: '150px' }}
                  name='firstName'
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'description' }}
                />
                <TextField
                  label="Last name"
                  value={changedFields.lastName || ''}
                  placeholder="Last name"
                  style={{ width: '150px' }}
                  name='lastName'
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'description' }}
                />
              </>
            )}
          {/* <UserTableRowButtons
            changedFields={changedFields}
            state={fullName}
            setState={setFullName}
            setChangedFields={setChangedFields}
            user={user}
          /> */}

        </StyledTableCell>
        <StyledTableCell align="inherit">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            { curTask ? (
              <Typography variant="inherit">
                {changedFields.current_task.split('\n').map((i, key) => <div key={key}>{i}</div>)}
              </Typography>
            )
              : (
                <TextField
                  style={{ width: '100%' }}
                  value={changedFields.current_task || ''}
                // variant="outlined"
                  label="Current Task"
                  multiline
                  name='current_task'
                  // onChange={handleChange}
                />
              )}
            <UserTableRowButtons
              changedFields={changedFields}
              state={curTask}
              setState={setCurTask}
              setChangedFields={setChangedFields}
              user={user}
            />
          </div>
        </StyledTableCell>
        <StyledTableCell align="center">
          {user.milestons.map((item) => (
            <p key={Math.random()}>
              {item.Projects.name}
            </p>
          ))}
        </StyledTableCell>
        <StyledTableCell align="center">{user.milestons.map((item) => <p key={Math.random()}>{item.role}</p>)}</StyledTableCell>
        <StyledTableCell align="center">{user.milestons.map((item) => <p key={Math.random()}>{item.rate}</p>)}</StyledTableCell>
        <StyledTableCell align="center">{user.milestons.map((item) => <p key={Math.random()}>{item.load}</p>)}</StyledTableCell>
        <StyledTableCell align="center" justify="space-between">
          {userRole ? devRole
            : (
              <FormControl
                placeholder='Role'
              >
                <InputLabel>Role</InputLabel>
                <Select
                  onChange={handleChange}
                  style={{ width: '200px' }}
                  labelWidth={47}
                  name='role'
                  value={changedFields.role || ''}
                >
                  {userRoles.map((role) => (
                    <MenuItem
                      value={role.value}
                      key={role.label}
                    >
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          {/* <UserTableRowButtons
            changedFields={changedFields}
            state={userRole}
            setState={setUserRole}
            setChangedFields={setChangedFields}
            user={user}
          /> */}
        </StyledTableCell>
        <StyledTableCell align="center">
          {/* // eslint-disable-next-line no-nested-ternary */}
          {percent ? changedFields.projectReady ? (`${changedFields.projectReady}%`) : ('-') : (
            <TextField
              type="number"
              value={changedFields.projectReady || ''}
              placeholder="Project ready"
              style={{ width: '100px' }}
              name='projectReady'
              onChange={handleChange}
            />
          )}
          {/* <UserTableRowButtons
            changedFields={changedFields}
            state={percent}
            setState={setPercent}
            setChangedFields={setChangedFields}
            user={user}
          /> */}
        </StyledTableCell>

        <StyledTableCell align="right">{user.seniority}</StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default UserTableRow;
