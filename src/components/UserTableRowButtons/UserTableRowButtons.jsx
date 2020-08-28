import React from 'react';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../../Redux/Actions/UsersActions/UserActions';
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
  const dispatch = useDispatch();
  const {
    state,
    newTask,
    setNewTask,
    changedFields,
    setState,
    setChangedFields,
    handleAddTask,
  } = props;

  const handleCancel = () => {
    setChangedFields(changedFields);
    setNewTask({ ...newTask, text: changedFields.current_task });
    setState(!state);
  };

  const handeCloseTask = async () => {
    if (newTask.text !== '') {
      const response = await axios.post('/history-tasks', newTask);
      dispatch(updateUser({ ...changedFields, current_task: '' }));
      setNewTask({ ...newTask, text: '' });
      setChangedFields({ ...changedFields, current_task: '' });
    }
  };
  return (
    <>
      {state
        ? (
          <>
            <Button
              className={classes.editButton}
              onClick={() => { setState(!state); }}
            >
              <EditSharpIcon />
            </Button>
          </>
        ) : (
          <div className={classes.buttons}>
            <>
              <Button
                title="Clear comment"
                onMouseDown={handeCloseTask}
                style={{ marginLeft: '-20px' }}
              >
                <DeleteIcon />
              </Button>
            </>
          </div>
        )}
    </>
  );
}

export default UserTableRowButtons;
