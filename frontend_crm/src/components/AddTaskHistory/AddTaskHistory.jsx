import React, { useState, useEffect } from 'react'; import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import IconButton from '@material-ui/core/IconButton';
import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import KeyboardArrowRightSharpIcon from '@material-ui/icons/KeyboardArrowRightSharp';
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp';

function AddTaskHistory(props) {
  const {
    user, setUsersTasks, usersTasks, handleChangeCurrentTask,
  } = props;
  const [taskHistoryTable, setTaskHistoryTable] = useState(true);
  const [newTask, setNewTask] = useState(user ? {
    user_uuid: user.uuid,
    creator_uuid: '',
    text: '',
  } : '');

  useEffect(() => {
    setNewTask({ ...newTask, user_uuid: user.uuid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uuid]);


  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    if (newTask.text !== '') {
      const response = await axios.post('/history-tasks', newTask);

      const taskId = response.data.uuid;

      handleChangeCurrentTask(taskId);
      setUsersTasks([...usersTasks, newTask]);
      setNewTask({
        user_uuid: user.uuid,
        creator_uuid: '',
        text: '',
      });
    }
  };

  const handleCloseTaskTable = () => {
    setTaskHistoryTable(!taskHistoryTable);
  };

  const users = useSelector((state) => state.users.users);

  let tasksList = [];
  if (user !== undefined && usersTasks !== undefined && users.length) {
    tasksList = (usersTasks.map((task) => {
      let createDate = new Date(task.createdAt);
      createDate = createDate.toLocaleString('en-GB', { hour12: false });
      // const authorName = users.find((elem) => task.creator_uuid === elem.uuid).fullName;
      return (
        <Grid key={Math.random()} item container style={{ alignItems: 'center' }} spacing={2}>
          <Grid item xs={4}>
            <TextField
              value={task.text}
              variant="outlined"
              label="Task"
              multiline
              rowsMax="5"
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={`${createDate}`}
              variant="outlined"
              label="Date"
              multiline
              rowsMax="5"
              style={{ width: '100%' }}
            />
          </Grid>

        </Grid>
      );
    }));
  }

  return (
    <>
      <Grid container style={{ alignItems: 'center' }} spacing={2}>
        <Grid item xs={6}>
          <TextField
            onChange={handleChange}
            value={newTask.text || ''}
            variant="outlined"
            label="New task"
            multiline
            rowsMax="5"
            name='text'
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={1}>
          <div style={{ display: 'flex' }}>
            <Tooltip title="Set task">
              <IconButton aria-label="delete" onClick={handleAddTask}>
                <AddCircleOutlineSharpIcon style={{ fontSize: '30px' }} />
              </IconButton>
            </Tooltip>
            {/* </Grid>
        <Grid item xs={1}> */}
            {taskHistoryTable
              ? (
                <Tooltip title="Show more tasks">
                  <Button onClick={handleCloseTaskTable}>
                    <KeyboardArrowRightSharpIcon />
                  </Button>
                </Tooltip>
              )
              : (
                <Button onClick={handleCloseTaskTable}>
                  <KeyboardArrowDownSharpIcon />
                </Button>
              )}
          </div>
        </Grid>
        {taskHistoryTable ? '' : tasksList}
      </Grid>
    </>
  );
}

export default AddTaskHistory;
