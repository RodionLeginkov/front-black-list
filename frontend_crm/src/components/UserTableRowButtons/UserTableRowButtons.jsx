import React from 'react';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginRight: 20,
  },
  editButton: {
    // position: 'absolute',
    color: '#777777',
    fontSize: '10px',
  },
  buttons: {
    // position: 'absolute',
  },
});


function UserTableRowButtons(props) {
  const classes = useStyles();

  const {
    handleAddTask,
    state,
    setState,
    setChangedFields,
    user,
  } = props;

  const handleCancel = (e) => {
    setChangedFields(user);
    setState(!state);
  };

  return (
    <>
      {state
        ? (
          <Button
            className={classes.editButton}
            onClick={(e) => { setState(!state); }}
          >
            <EditSharpIcon />
          </Button>
        ) : (
          <div className={classes.buttons}>
            <Button
              // className={classes.button}
              onClick={handleAddTask}
            >
              <CheckSharpIcon />
            </Button>
            <Button
              // className={classes.button}
              onClick={handleCancel}
            >
              <CloseSharpIcon />
            </Button>
          </div>
        )}
    </>
  );
}

export default UserTableRowButtons;
