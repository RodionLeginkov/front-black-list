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
  const { participant } = props;
  return (
    <>
      <Grid container item spacing={1} alignItems="center" style={{ paddingTop: '10px' }}>
        <Grid item xs={5}>
          <TextField
            label="Role"
            variant="outlined"
            inputProps={{ 'aria-label': 'description' }}
            className={classes.inputForm}
            name='role'
            value={participant.name}
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            label="Role"
            variant="outlined"
            inputProps={{ 'aria-label': 'description' }}
            className={classes.inputForm}
            name='role'
            value={participant.role}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ParticipantsListItem;
