import React from 'react';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../UserTableRow/style.css';

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
    newTask,
    setNewTask,
    changedFields,
    setState,
    setChangedFields,
  } = props;

  const handleCancel = () => {
    setChangedFields(changedFields);
    setNewTask({ ...newTask, text: changedFields.current_task });
    setState(!state);
  };

  return (
    <>
      {state
        ? (
          <Button
            className={classes.editButton}
            onClick={() => { setState(!state); }}
          >
            <EditSharpIcon />
          </Button>
        ) : (
          <div className={classes.buttons}>
            <Button
              onMouseDown={handleAddTask}
            >
              <CheckSharpIcon />
            </Button>
            <Button
              name="closeButton"
              onMouseDown={handleCancel}
            >
              <CloseSharpIcon />
            </Button>
          </div>
        )}
    </>
  );
}

export default UserTableRowButtons;
