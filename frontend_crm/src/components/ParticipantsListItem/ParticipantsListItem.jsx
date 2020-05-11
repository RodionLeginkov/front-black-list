import React, { useState, useEffect } from 'react';
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
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import DevelopersChooseForm from '../DevelopersChooseForm/index.jsx';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

const useStyles = makeStyles(() => ({
  inputForm: {
    width: '100%',
    // marginTop: '10px',
    marginBottom: '0px',
    paddingBottom: '0px',
  },
}));

const ParticipantsListItem = (props) => {
  const classes = useStyles();
  const {
    participant,
    participantDelete,
    participantChange,
    editedParticipents,
    setEditedParticipents,
  } = props;
  const [curParicipant, setCurParicipant] = useState(participant);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (editedParticipents !== curParicipant.uuid && !isEdited) setCurParicipant(participant);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedParticipents]);

  const handleDelete = async () => {
    if (curParicipant.uuid) {
      await axios.delete(`/participant/${participant.uuid}`);
      participantDelete(curParicipant);
    } else {
      participantDelete(curParicipant);
    }
  };

  const handleChangeParticipant = async () => {
    setIsEdited(true);
    setEditedParticipents('');
    if (curParicipant.uuid) {
      await axios.put(`/participant/${participant.uuid}`, curParicipant);
      participantChange(curParicipant);
    } else {
      participantChange(curParicipant);
    }
  };

  const handleCloseEdit = () => {
    setEditedParticipents('');
    setCurParicipant(participant);
  };

  const handleChange = (e) => {
    // setErrors({ ...errors, [e.target.name]: '' });
    setCurParicipant({ ...curParicipant, [e.target.name]: e.target.value });
  };
  const userChange = (user) => {
    // setErrors({ ...errors, name: '' });
    setCurParicipant({ ...curParicipant, name: user.fullName });
  };


  return (
    <>
      <Grid container item spacing={1} alignItems="center" style={{ paddingTop: '10px' }}>
        <Grid item xs={5}>
          <DevelopersChooseForm
            name='Person'
            userChange={userChange}
            developersValue={curParicipant.name}
            isParticipent
            show={editedParticipents !== curParicipant.uuid}
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            label="Role"
            variant="outlined"
            inputProps={{ 'aria-label': 'description' }}
            className={classes.inputForm}
            name='role'
            value={curParicipant.role}
            disabled={editedParticipents !== curParicipant.uuid}
            onChange={handleChange}
          />
        </Grid>
        {editedParticipents !== curParicipant.uuid
          ? (
            <>
              <Grid item sm={1}>
                <IconButton onClick={() => { setEditedParticipents(curParicipant.uuid); setIsEdited(false); }}>
                  <CreateSharpIcon />
                </IconButton>
              </Grid>
              <Grid item sm={1}>
                <IconButton onClick={handleDelete}>
                  <DeleteSharpIcon />
                </IconButton>
              </Grid>
            </>
          )
          : (
            <>
              <Grid item sm={1}>
                <IconButton onClick={handleChangeParticipant}>
                  <CheckSharpIcon />
                </IconButton>
              </Grid>
              <Grid item sm={1} onClick={handleCloseEdit}>
                <IconButton>
                  <CloseSharpIcon />
                </IconButton>
              </Grid>
            </>
          )}
      </Grid>
    </>
  );
};

export default ParticipantsListItem;
