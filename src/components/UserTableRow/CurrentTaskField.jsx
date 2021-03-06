/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import UserTableRowButtons from '../UserTableRowButtons/UserTableRowButtons.jsx';
import { updateUser } from '../../Redux/Actions/UsersActions/UserActions';

import './style.css';

function CurrentTaskField(props) {
  // eslint-disable-next-line no-underscore-dangle
  const _isMounted = useRef(true);
  const { user, changedFields, setChangedFields } = props;
  const dispatch = useDispatch();
  const [curTask, setCurTask] = useState(true);
  const [newTask, setNewTask] = useState(user && changedFields.current_task !== undefined ? {
    user_uuid: user.uuid,
    creator_uuid: '',
    text: changedFields.current_task,
  } : '');
  useEffect(() => { // ComponentWillUnmount in Class Component
    _isMounted.current = false;
  }, []);

  const handleTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    if (changedFields.current_task !== newTask.text && newTask.text !== '') {
      const response = await axios.post('/history-tasks', newTask);
      const taskId = response.data.uuid;
      dispatch(updateUser({ ...changedFields, current_task: taskId }));
      setNewTask({ ...newTask, text: response.data.text });
      setChangedFields({ ...changedFields, current_task: response.data.text });
    } else { setCurTask(!curTask); }
  };

  const handleCancel = () => {
    setChangedFields(changedFields);
    setNewTask({ ...newTask, text: changedFields.current_task });
    setCurTask(!curTask);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      handleCancel();
    } else if (!e.ctrlKey && !e.shiftKey && e.key === 'Enter') {
      // e.preventDefault();
      handleAddTask();
    }
    // else if (e.ctrlKey && e.key === 'Enter') {
    //   e.target.value += '\n';
    // }
  };
  console.log('new', newTask);
  const handleOnBlur = () => {
    if (changedFields.current_task !== newTask.text) {
      handleAddTask();
    }
    setCurTask(!curTask);
  };
  if (changedFields.current_task === null || changedFields.current_task === undefined) return '';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onBlur={handleOnBlur}>
      { curTask ? (
        <Typography variant="inherit">
          {changedFields.current_task.split('\n').map((i, key) => <div key={key}>{i}</div>)}
        </Typography>
      )
        : (
          <div>
            <TextField
              autoFocus
              onChange={handleTaskChange}
              value={newTask.text || ''}
              variant="outlined"
              label="New comment"
              multiline
              rowsMax="5"
              name='text'
              style={{ width: '100%', marginBottom: 5 }}
              onKeyDown={handleKeyPress}
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
          setNewTask={setNewTask}
          newTask={newTask}
        />
      </div>
    </div>
  );
}

export default CurrentTaskField;
