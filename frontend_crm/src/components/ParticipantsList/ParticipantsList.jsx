import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import IconButton from '@material-ui/core/IconButton';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import DevelopersChooseForm from '../DevelopersChooseForm/index.jsx';

const useStyles = makeStyles(() => ({
  inputForm: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '0px',
    paddingBottom: '0px',
  },
}));

const ParticipantsList = (props) => {
  const classes = useStyles();
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    role: '',
  });
  const { participants, addParticipant } = props;
  const handleChange = (e) => {
    setNewParticipant({ ...newParticipant, [e.target.name]: e.target.value });
  };
  const userChange = (user) => { setNewParticipant({ ...newParticipant, name: user.fullName }); };
  const addNewParticipant = () => {
    console.log(newParticipant);
    addParticipant(newParticipant);
    setNewParticipant({ name: '', role: '' });
  };

  return (
    <>
      <Grid container item spacing={1} alignItems="center">
        <Grid item xs={5}>
          <DevelopersChooseForm
            name='Person'
            userChange={userChange}
            developersValue={newParticipant.name}
            isParticipent
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            label="Role"
            variant="outlined"
            inputProps={{ 'aria-label': 'description' }}
            className={classes.inputForm}
            name='role'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            onClick={addNewParticipant}
          >
            <AddCircleOutlineSharpIcon style={{ fontSize: '25px' }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default ParticipantsList;
