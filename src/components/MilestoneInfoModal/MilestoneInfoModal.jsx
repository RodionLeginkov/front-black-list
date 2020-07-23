import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { updateMilestone } from '../../Redux/Actions/MilestonesActions/MilestonesActions';
import { paymentTypes } from '../../constants/constants';
import DevelopersChooseForm from '../DevelopersChooseForm/index.jsx';
import './styles.css';

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
    color: 'black',
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
  const {
    project,
    openModal,
    setOpenModal,
    customer,
    archived,
    projectPage,
  } = props;
  const [milestone, setMilestone] = useState(project);
  const [errors, setErrors] = useState({
    user_uuid: '',
    load: '',
    role: '',
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  // setMilestone(project);
  const handleCancel = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };
  const userChange = (user) => { setMilestone({ ...milestone, user_uuid: user ? user.uuid : '', Users: user }); };
  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setMilestone({ ...milestone, [e.target.name]: e.target.value });
  };
  const HandleRateTyoeChange = (e, values) => {
    setMilestone({ ...milestone, rate_type: values ? values.value : null });
  };

  const startDateChange = (startDate) => { setMilestone({ ...milestone, start_date: startDate }); };
  const endDateChange = (endDate) => {
    setMilestone({ ...milestone, end_date: endDate });
  };

  const handlePersonChange = (e, values) => {
    setMilestone({ ...milestone, person_uuid: values ? values.uuid : null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateMilestone({ ...milestone, rate: milestone.rate !== '' ? milestone.rate : 0 }));
    await dispatch(getProject(project.project_uuid));
  };
  let createDate = new Date(project.start_date);
  let endDate = new Date(project.end_date);
  createDate = createDate.toLocaleString('en-GB', { hour12: false });
  endDate = project.end_date !== null ? endDate.toLocaleString('en-GB', { hour12: false }) : '― / ― / ―';

  let curPerson;

  if (customer.Person !== undefined) {
    curPerson = customer.Person.find((item) => item.uuid === milestone.person_uuid);
  } else curPerson = '―';
  const curRateType = milestone.rate_type ? paymentTypes.find((item) => item.value === milestone.rate_type) : '';
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
                  {projectPage ? (
                    <DevelopersChooseForm
                      show={!archived}
                      name='Developers'
                      developersValue={milestone.user_uuid}
                      userChange={userChange}
                      disabled={!archived}
                    />
                  ) : (
                    <TextField
                      name='Project'
                      variant="outlined"
                      label="Project"
                      inputProps={{ 'aria-label': 'description' }}
                      className={classes.inputForm}
                      value={customer.name}
                      onChange={handleChange}
                      disabled={!archived}

                    />
                  )}


                </Grid>
                <Grid item xs={12} sm={12} style={{ paddingBottom: 0 }}>
                  {archived ? (
                    <Autocomplete
                      style={{ paddingTop: '5px' }}
                      options={customer.Person}
                      onChange={handlePersonChange}
                      getOptionLabel={(option) => `${option.name}`}
                      renderInput={(params) => <TextField {...params} label="Person" variant="outlined" />}
                      value={curPerson || null}
                    />
                  ) : (
                    <TextField
                      name='Person'
                      variant="outlined"
                      label="Person"
                      inputProps={{ 'aria-label': 'description' }}
                      className={classes.inputForm}
                      value={curPerson || ''}
                      onChange={handleChange}
                      disabled={!archived}
                    />
                  )}

                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                  <TextField
                    value={milestone.role || ''}
                    label="Role"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={`${classes.inputForm} disabled-color`}
                    name='role'
                    onChange={handleChange}
                    disabled={!archived}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                  <TextField
                    type="number"
                    value={milestone.load || ''}
                    label="Load"
                    variant="outlined"
                    className={classes.inputForm}
                    name='load'
                    disabled={!archived}
                    onChange={handleChange}
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
                    value={milestone.rate || ''}
                    label="Rate"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='rate'
                    disabled={!archived}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <Autocomplete
                    options={paymentTypes}
                    getOptionLabel={(option) => option.label}
                    style={{ paddingTop: '5px' }}
                    renderInput={(params) => <TextField {...params} label="Rate Type" variant="outlined" />}
                    value={curRateType || null}
                    disabled={!archived}
                    onChange={HandleRateTyoeChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    value={milestone.platform || ''}
                    label="Platform"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='platform'
                    disabled={!archived}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    value={milestone.withdraw || ''}
                    label="Withdraw"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='withdraw'
                    disabled={!archived}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12} style={{ paddingTop: 0 }}>
                  <TextField
                    value={milestone.comment || ''}
                    label={archived ? 'Post mortem' : 'Comment'}
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='comment'
                    disabled={!archived}
                    onChange={handleChange}

                  />
                </Grid>
              </Grid>
              {archived ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    helperText={(!project.start_date) ? 'Empty field.' : ''}
                    className={clsx(classes.formControl, classes.inputForm)}
                    style={{ width: '100%' }}
                    inputVariant="outlined"
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    autoOk
                    margin="normal"
                    value={milestone.start_date}
                    label="Start Date"
                    onChange={startDateChange}
                  />

                  <KeyboardDatePicker
                    style={{ width: '100%' }}
                    inputVariant="outlined"
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    autoOk
                    label="End date"
                    className={clsx(classes.formControl, classes.inputForm)}
                    onChange={endDateChange}
                    value={milestone.end_date}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />

                </MuiPickersUtilsProvider>
              ) : (
                <>
                  <Grid item xs={12} sm={12} style={{ paddingTop: 0 }}>
                    <TextField
                      value={createDate || ''}
                      label="Start date"
                      variant="outlined"
                      inputProps={{ 'aria-label': 'description' }}
                      className={classes.inputForm}
                      disabled={!archived}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ paddingTop: 0 }}>
                    <TextField
                      value={endDate || ''}
                      label="End date"
                      variant="outlined"
                      inputProps={{ 'aria-label': 'description' }}
                      className={classes.inputForm}
                      disabled={!archived}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              ) }

              <div className={classes.buttons}>
                {archived && (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submitButton}
                  onClick={handleSubmit}
                >
                  Change
                </Button>
                )}
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
