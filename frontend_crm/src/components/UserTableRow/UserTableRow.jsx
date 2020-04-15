import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { useDispatch } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import { userRoles } from '../../constants/constants';
import DevelopersChooseForm from '../DevelopersChooseForm/index.jsx';
import UserTableRowButtons from '../UserTableRowButtons/UserTableRowButtons.jsx';
import { updateUser, findUser } from '../../Redux/Actions/UsersActions/UserActions';
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
  // raw: {
  //   '&:hover': {
  //     boxShadow: '0px 10px 10px 10px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  //   },
  //   '&:hover .button': {
  //     backgroundColor: '#DEDEDE',
  //     color: 'blue',
  //   },
  // },
  listItemSecondaryAction: {
    visibility: 'hidden',
  },
  listItem: {
    border: '1px solid blue',
    '&:hover $listItemSecondaryAction': {
      visibility: 'inherit',
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
  // console.log(user)
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(true);
  const [percent, setPercent] = useState(true);
  const [fullName, setFullName] = useState(true);
  const [curTask, setCurTask] = useState(true);
  const [changedFields, setChangedFields] = useState(user);
  const [newTask, setNewTask] = useState(user ? {
    user_uuid: user.uuid,
    creator_uuid: '',
    text: '',
  } : '');
  const handleChange = (e) => {
    setChangedFields({ ...changedFields, [e.target.name]: e.target.value });
  };

  const handleTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async (e) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_API}history-tasks`, newTask);
    const taskId = response.data.uuid;
    dispatch(updateUser({ ...changedFields, current_task: taskId }));
    setChangedFields({ ...changedFields, current_task: response.data.text });
    setCurTask(!curTask);
  };

  const authorChange = (author) => { setNewTask({ ...newTask, creator_uuid: author ? author.uuid : '' }); };

  const devRole = userRoles.find((item) => item.value === changedFields.role).label;

  function handleClick(id) {
    dispatch(findUser(id));
    history.push(`/user/${id}`);
  }

  return (
    <>
      <StyledTableRow
        className="raw"
        style={{ cursor: 'pointer' }}

      >
        <StyledTableCell align="center" component="th" scope="row" className={classes.cell}>
          {changedFields.firstName}
          {' '}
          {changedFields.lastName}
          <Button className={classes.button}>
            <AssignmentIndIcon className="buttons" onClick={() => handleClick(changedFields.uuid)} />
          </Button>
          {/* {fullName
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
            )} */}
          {/* <UserTableRowButtons
            changedFields={changedFields}
            state={fullName}
            setState={setFullName}
            setChangedFields={setChangedFields}
            user={user}
          /> */}

        </StyledTableCell>
        <StyledTableCell sortDirection align="inherit">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            { curTask ? (
              <Typography variant="inherit">
                {changedFields.current_task.split('\n').map((i, key) => <div key={key}>{i}</div>)}
              </Typography>
            )
              : (
                <div>
                  <TextField
                    onChange={handleTaskChange}
                    value={newTask.text || ''}
                    variant="outlined"
                    label="New task"
                    multiline
                    rowsMax="5"
                    name='text'
                    style={{ width: '100%', marginBottom: 5 }}
                  />
                  <DevelopersChooseForm
                    name='Author'
                    userChange={authorChange}
                    developersValue={newTask.creator_uuid}
                    isEdit
                  />
                </div>
              )}
            <div className="buttons">
              <UserTableRowButtons
                handleAddTask={handleAddTask}
                changedFields={changedFields}
                state={curTask}
                setState={setCurTask}
                setChangedFields={setChangedFields}
                user={user}
              />
            </div>
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
