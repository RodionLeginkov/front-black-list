/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { useDispatch } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { userRoles } from '../../constants/constants';
import { findUser, getUser } from '../../Redux/Actions/UsersActions/UserActions';
import './style.css';
import CurrentTaskField from './CurrentTaskField.jsx';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginRight: 20,
  },
  button: {
    position: 'absolute',
    color: '#777777',
    top: '-6px',
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
  const token = localStorage.getItem('token');
  const { user, visibeCells } = props;
  const [changedFields, setChangedFields] = useState(user);
  const [newTask, setNewTask] = useState(user ? {
    user_uuid: user.uuid,
    creator_uuid: '',
    text: '',
  } : '');

  const devRole = userRoles.find((item) => item.value === changedFields.role).label;

  function handleClick() {
    dispatch(getUser(user.uuid));
    history.push(`/user/${user.uuid}`);
  }

  return (

    <StyledTableRow
      key={Math.random()}
      className="raw"
    >
      {visibeCells.includes('Name')
        ? (
          <StyledTableCell
            align="center"
            component="th"
            cope="row"
            className={classes.cell}
          >
            <div style={{ cursor: 'pointer' }} onClick={() => handleClick()}>
              {changedFields.firstName}
              {' '}
              {changedFields.lastName}
            </div>
          </StyledTableCell>
        )
        : false}
      {visibeCells.includes('Current Task')
        ? (
          <StyledTableCell align="left">
            <CurrentTaskField
              user={user}
              changedFields={changedFields}
              setChangedFields={setChangedFields}
            />
          </StyledTableCell>
        )
        : false}
      {visibeCells.includes('Current project')
        ? (
          <StyledTableCell style={{ paddingRight: 0 }} align="center">
            {user.milestons.map((item) => (
              <div key={Math.random()}>
                <Typography
                  style={{ cursor: 'pointer', paddingTop: 5 }}
                  onClick={() => history.push(`/projects/${item.project_uuid}`)}
                  key={Math.random()}
                >
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
      {visibeCells.includes('Load(h/week)')
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
        ? <StyledTableCell align="center">{user.seniority}</StyledTableCell>
        : false }
    </StyledTableRow>

  );
};

export default UserTableRow;
