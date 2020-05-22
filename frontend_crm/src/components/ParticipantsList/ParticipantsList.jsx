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
import validator from 'validator';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import DevelopersChooseForm from '../DevelopersChooseForm/index.jsx';
import ParticipantsListItem from '../ParticipantsListItem/ParticipantsListItem.jsx';

const useStyles = makeStyles(() => ({
  inputForm: {
    width: '100%',
    // marginTop: '10px',
    marginBottom: '0px',
    paddingBottom: '0px',
  },
}));

const ParticipantsList = (props) => {
  const classes = useStyles();
  const {
    participants,
    addParticipant,
    personId,
    participantDelete,
    participantChange,
  } = props;
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    role: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    role: '',
  });
  const [editedParticipents, setEditedParticipents] = useState('');
  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setNewParticipant({ ...newParticipant, [e.target.name]: e.target.value });
  };
  const userChange = (user) => {
    setErrors({ ...errors, name: '' });
    setNewParticipant({ ...newParticipant, name: user !== null ? user.fullName : '' });
  };

  const validateParticipants = () => {
    const fieldsErrors = {};
    if (validator.isEmpty(newParticipant.name)) fieldsErrors.name = 'Name is required field.';
    if (validator.isEmpty(newParticipant.role)) fieldsErrors.role = 'Customer is required field.';
    return Object.keys(fieldsErrors).length ? fieldsErrors : false;
  };

  const addNewParticipant = async () => {
    const validateErrors = validateParticipants();
    if (validateErrors) {
      setErrors(validateErrors);
    } else if (personId) {
      const response = await axios.post('/participant', { ...newParticipant, person_uuid: personId });
      addParticipant(response.data);
      setNewParticipant({ name: '', role: '' });
    } else {
      addParticipant(newParticipant);
      setNewParticipant({ name: '', role: '' });
    }
  };

  const participantsList = (participants !== undefined) ? (participants.map((item, index) => (
    <ParticipantsListItem
      key={index}
      participant={item}
      participantDelete={participantDelete}
      participantChange={participantChange}
      editedParticipents={editedParticipents}
      setEditedParticipents={setEditedParticipents}
    />
  ))) : '';

  return (
    <>
      <Grid container item spacing={1} alignItems="center" style={{ paddingTop: '10px' }}>
        {participantsList}
        <Grid item xs={5}>
          <DevelopersChooseForm
            name='User'
            userChange={userChange}
            developersValue={newParticipant.name}
            isParticipent
            isError={errors.name}
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            error={Boolean(errors.role)}
            helperText={errors.role}
            label="Role"
            variant="outlined"
            inputProps={{ 'aria-label': 'description' }}
            className={classes.inputForm}
            name='role'
            onChange={handleChange}
            value={newParticipant.role}
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
