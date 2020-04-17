/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import DevelopersChooseForm from '../DevelopersChooseForm/index.jsx';
import UserTableRowButtons from '../UserTableRowButtons/UserTableRowButtons.jsx';
import { updateUser, getUser } from '../../Redux/Actions/UsersActions/UserActions';
import './style.css';

function CurrentTaskField(props) {
  const { user, changedFields, setChangedFields } = props;
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const [curTask, setCurTask] = useState(true);
  const [newTask, setNewTask] = useState(user ? {
    user_uuid: user.uuid,
    creator_uuid: '',
    text: '',
  } : '');

  const handleTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async (e) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_API}history-tasks`, newTask, { headers: { authorization: token } });
    const taskId = response.data.uuid;
    dispatch(updateUser({ ...changedFields, current_task: taskId }));
    setChangedFields({ ...changedFields, current_task: response.data.text });
    dispatch(getUser(user.uuid));
    setCurTask(!curTask);
  };

  const authorChange = (author) => { setNewTask({ ...newTask, creator_uuid: author ? author.uuid : '' }); };

  return (
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
            {/* <DevelopersChooseForm
              name='Author'
              userChange={authorChange}
              developersValue={newTask.creator_uuid}
              isEdit
            /> */}
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
  );
}

export default CurrentTaskField;
