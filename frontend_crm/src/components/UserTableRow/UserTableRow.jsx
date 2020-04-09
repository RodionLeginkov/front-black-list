import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { Button, TextField } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { userRoles } from '../../constants/constants';
import { findUser } from '../../Redux/Actions/UsersActions/UserActions';

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
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const UserTableRow = ({ user, projects }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [role, setRole] = useState(true);
  const [percent, setPercent] = useState(true);
  const [fullName, setFullName] = useState(true);
  const [changedFields, setChangedFields] = useState(user);

  function handleClick(id) {
    dispatch(findUser(id));
    history.push(`/user/${id}`);
  }

  const handleChange = (e) => {
    // setUser({ ...user, [e.target.name]: e.target.value });
  };


  console.log(user.currentTask);

  return (
    <>
      <StyledTableRow
        style={{ cursor: 'pointer' }}
      >
        <StyledTableCell component="th" scope="row">

          {fullName
            ? `${changedFields.fName} ${changedFields.lName}`
            : (
              <>
                <TextField
                  value={changedFields.fName || ''}
                  placeholder="First name"
                  style={{ width: '150px' }}
                  name='fName'
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'description' }}
                />
                <TextField
                  value={changedFields.lName || ''}
                  placeholder="Last name"
                  style={{ width: '150px' }}
                  name='lName'
                  onChange={handleChange}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'description' }}
                />
              </>
            )}
          {/* <Button
            className={classes.editButton}
            onClick={(e) => { e.stopPropagation(); setFullName(!fullName); }}
          >
            <EditSharpIcon />
          </Button> */}
        </StyledTableCell>
        <StyledTableCell align="right">
          {user.currentTask}
        </StyledTableCell>
        <StyledTableCell align="right">
          {user.milestons.map((item) => (
            <p key={Math.random()}>
              {projects.map((project) => {
                if (project.uuid === item.project_uuid) return project.name;
                return null;
              })}
            </p>
          ))}
        </StyledTableCell>
        <StyledTableCell align="right">{user.milestons.map((item) => <p key={Math.random()}>{item.role}</p>)}</StyledTableCell>
        <StyledTableCell align="right">
          {role ? changedFields.role
            : (
              <FormControl
                placeholder='Role'
              >
                <InputLabel>Role</InputLabel>
                <Select
                  style={{ width: '250px' }}
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
          {/* <Button
            className={classes.editButton}
            onClick={(e) => { e.stopPropagation(); setRole(!role); }}
          >
            <EditSharpIcon />
          </Button> */}
        </StyledTableCell>
        <StyledTableCell align="right">{user.milestons.map((item) => <p key={Math.random()}>{item.rate}</p>)}</StyledTableCell>
        <StyledTableCell align="right">
          {percent ? `${changedFields.projectReady}%` : (
            <Input
              value={changedFields.projectReady || ''}
              placeholder="Project ready"
              style={{ width: '150px' }}
              inputProps={{ 'aria-label': 'description' }}
            />
          )}
          {/* <Button
            className={classes.editButton}
            onClick={(e) => { e.stopPropagation(); setPercent(!percent); }}
          >
            <EditSharpIcon />
          </Button> */}
        </StyledTableCell>

        <StyledTableCell align="right">{user.seniority}</StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default UserTableRow;
