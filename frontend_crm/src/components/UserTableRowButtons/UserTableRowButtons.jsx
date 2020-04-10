import React from 'react';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { findUser, updateUser, getUser } from '../../Redux/Actions/UsersActions/UserActions';

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


function UserTableRowButtons(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    className,
    state,
    setState,
    changedFields,
    setChangedFields,
    user,
  } = props;

  console.log(className);

  const handleCancel = (e) => {
    e.stopPropagation();
    setChangedFields(user);
    setState(!state);
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    dispatch(updateUser(changedFields));
    dispatch(getUser(user.uuid));
    setState(!state);
  };

  return (
    <>
      {state
        ? (
          <Button
            className={classes.editButton}
            onClick={(e) => { e.stopPropagation(); setState(!state); }}
          >
            <EditSharpIcon />
          </Button>
        ) : (
          <>
            <Button
              className={classes.editButton}
              onClick={handleSubmit}
            >
              <CheckSharpIcon />
            </Button>
            <Button
              className={classes.editButton}
              onClick={handleCancel}
            >
              <CloseSharpIcon />
            </Button>
          </>
        )}
    </>
  );
}

export default UserTableRowButtons;
