/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { useDispatch } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
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

const UserTableRow = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, visibeCells } = props;
  const [curTask, setCurTask] = useState(true);
  const [changedFields, setChangedFields] = useState(user);
  const [newTask, setNewTask] = useState(user ? {
    user_uuid: user.uuid,
    creator_uuid: '',
    text: '',
  } : '');

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

    <StyledTableRow
      key={Math.random()}
      className="raw"
    >
      {visibeCells.includes('Name')
        ? (
          <StyledTableCell align="center" component="th" scope="row" className={classes.cell}>
            {changedFields.firstName}
            {' '}
            {changedFields.lastName}
            <Button className={classes.button}>
              <AssignmentIndIcon className="buttons" onClick={() => handleClick(changedFields.uuid)} />
            </Button>
          </StyledTableCell>
        )
        : false}
      {visibeCells.includes('Current Task')
        ? (
          <StyledTableCell align="center">
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
        )
        : false}
      {visibeCells.includes('Current project')
        ? (
          <StyledTableCell style={{ paddingRight: 0 }} align="center">
            {user.milestons.map((item) => (
              <div key={Math.random()}>
                <Typography style={{ paddingTop: 5 }} key={Math.random()}>
                  {item.Projects.name}
                </Typography>
                {user.milestons.indexOf(item) === user.milestons.length - 1 ? '' : <Divider />}
              </div>
            ))}
          </StyledTableCell>
        )
        : false }
      {visibeCells.includes('Role in the project')
        ? (
          <StyledTableCell style={{ padding: '16px 0px' }} align="center">
            {user.milestons.map((item) => (
              <div key={Math.random()}>
                <Typography style={{ paddingTop: 5 }} key={Math.random()}>{item.role}</Typography>
                {user.milestons.indexOf(item) === user.milestons.length - 1 ? '' : <Divider />}
              </div>
            ))}
          </StyledTableCell>
        )
        : false }
      {visibeCells.includes('Current rate')
        ? (
          <StyledTableCell style={{ padding: '16px 0px' }} align="center">
            {user.milestons.map((item) => (
              <div key={Math.random()}>
                <Typography style={{ paddingTop: 5 }} key={Math.random()}>{item.rate}</Typography>
                {user.milestons.indexOf(item) === user.milestons.length - 1 ? '' : <Divider />}
              </div>
            ))}
          </StyledTableCell>
        )
        : false }
      {visibeCells.includes('Load(h/weak)')
        ? (
          <StyledTableCell style={{ paddingLeft: 0 }} align="center">
            {user.milestons.map((item) => (
              <div key={Math.random()}>
                <Typography style={{ paddingTop: 5 }} key={Math.random()}>{item.load}</Typography>
                {user.milestons.indexOf(item) === user.milestons.length - 1 ? '' : <Divider />}
              </div>
            ))}
          </StyledTableCell>
        )
        : false }
      {visibeCells.includes('Role')
        ? (
          <StyledTableCell align="center" justify="space-between">
            {devRole}
          </StyledTableCell>
        )
        : false }
      {visibeCells.includes('Project Ready')
        ? (
          <StyledTableCell align="center">
            {changedFields.projectReady}
          </StyledTableCell>
        )
        : false }
      {visibeCells.includes('Seniority')
        ? <StyledTableCell align="right">{user.seniority}</StyledTableCell>
        : false }
    </StyledTableRow>

  );
};

export default UserTableRow;
