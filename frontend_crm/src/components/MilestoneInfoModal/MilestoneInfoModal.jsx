import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextField } from '@material-ui/core';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DevelopersChooseForm from '../DevelopersChooseForm/index.jsx';
import { paymentTypes } from '../../constants/constants';

const useStyles = makeStyles((theme) => ({
  modal: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: '20px 40px',
  },
  position: {
    display: 'flex',
    alignItems: 'Center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13 px',
  },
  submitButton: {
    marginTop: '20px',
  },
  modalWidth: {
    width: '600px',
  },
  header: {
    color: '#777',
  },
  inputForm: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '0px',
    paddingBottom: '0px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  },
}));

const MilestoneInfoModal = (props) => {
  const { project, openModal, setOpenModal } = props;
  const classes = useStyles();
  const handleCancel = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };
  let paymentType = `${project.rate_type !== '' ? paymentTypes.find((item) => item.value === project.rate_type) : '–'}`;
  if (paymentType.label !== undefined) paymentType = paymentType.label;
  // const paymentType = paymentTypes.find((item) => item.value === project.rate_type).label;
  let createDate = new Date(project.start_date);
  let endDate = new Date(project.end_date);
  createDate = createDate.toLocaleString('en-US', { hour12: false });
  endDate = endDate.toLocaleString('en-US', { hour12: false });
  return (
    <div className={classes.position}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={clsx(classes.paper, classes.modalWidth)}>
            <form className={classes.root} noValidate autoComplete="off">
              <h2 className={classes.header}>{project.name}</h2>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} style={{ paddingBottom: 0 }}>
                  <DevelopersChooseForm
                    show
                    name='Developers'
                    developersValue={project.user_uuid}
                    isEdit
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                  <TextField
                    value={project.role || ''}
                    label="Role"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='role'

                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                  <TextField
                    type="number"
                    value={project.load || ''}
                    label="Load"
                    variant="outlined"
                    className={classes.inputForm}
                    name='load'
                    InputProps={{
                      endAdornment:
  <InputAdornment position="end">
    hr/week
  </InputAdornment>,

                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    type="number"
                    value={project.rate || ''}
                    label="Rate"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='rate'
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    value={paymentType}
                    label="Rate type"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='rate'
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    value={project.platform || ''}
                    label="Platform"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='platform'
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    value={project.withdraw || ''}
                    label="Withdraw"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='withdraw'
                  />
                </Grid>
                <Grid item xs={12} sm={12} style={{ paddingTop: 0 }}>
                  <TextField
                    value={project.comment || ''}
                    label="Comment"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='comment'

                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} style={{ paddingTop: 0 }}>
                <TextField
                  value={createDate || ''}
                  label="Comment"
                  variant="outlined"
                  inputProps={{ 'aria-label': 'description' }}
                  className={classes.inputForm}
                  name='comment'
                />
              </Grid>
              <Grid item xs={12} sm={12} style={{ paddingTop: 0 }}>
                <TextField
                  value={endDate || ''}
                  label="Comment"
                  variant="outlined"
                  inputProps={{ 'aria-label': 'description' }}
                  className={classes.inputForm}
                  name='comment'
                />
              </Grid>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submitButton}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default MilestoneInfoModal;
