import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextField } from '@material-ui/core';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addMilestone, updateMilestone } from '../../Redux/Actions/MilestonesActions/MilestonesActions';
import { getProject, getProjects, updateProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
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

export default function AddNewMilestoneModal(props) {
  const {
    forRead,
    addUserModalOpen,
    setAddUserModalOpen,
    projectMilestones,
    curProject,
    isEdit,
    initialMilestone,
    setArchive,
    archive,
    allProjects,
    milestonesChange,
    projectId,
    milestoneEdit,
    newProjectId,
    projectView,
  } = props;
  const classes = useStyles();


  const dispatch = useDispatch();
  const initialValue = initialMilestone || {
    user_uuid: '',
    project_uuid: curProject.uuid,
    person_uuid: null,
    role: '',
    rate: null,
    rate_type: '',
    load: null,
    start_date: new Date(),
    end_date: null,
    Users: {},
    platform: '',
    withdraw: '',
    comment: '',
    status: 'Active',
  };
  const curDate = new Date();
  const [isError, setIsError] = useState(false);
  const [project, setProject] = useState(initialValue);
  const [errors, setErrors] = useState({
    user_uuid: '',
    load: '',
    role: '',
    // start_date: '',
  });

  const [errorsDeathRattle, setErrorsDeathRattle] = useState({
    end_date: '',
  });
  const handleCancel = (e) => {
    e.preventDefault();
    setErrors({
      user_uuid: '',
      load: '',
      role: '',
      // start_date: '',
    });
    setErrorsDeathRattle({ ...errorsDeathRattle, end_date: '' });
    setIsError(false);
    setProject(initialValue);
    if (initialMilestone) {
      setArchive(false);
    }
    setAddUserModalOpen(false);
  };
  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setProject({ ...project, [e.target.name]: e.target.value });
  };


  const handlePersonChange = (e, values) => {
    setProject({ ...project, person_uuid: values ? values.uuid : null });
  };

  const HandleRateTyoeChange = (e, values) => {
    setProject({ ...project, rate_type: values ? values.value : null });
  };

  const validateMilestone = () => {
    const fieldsErrors = {};
    if (validator.isEmpty(project.user_uuid)) fieldsErrors.user_uuid = 'Developer is required field.';
    if (!project.load) fieldsErrors.load = 'Load is required field.';
    if (validator.isEmpty(project.role)) fieldsErrors.role = 'Role is required field.';
    else if (project.role.length > 50) fieldsErrors.role = 'Role field is too long.';
    return Object.keys(fieldsErrors).length ? fieldsErrors : false;
  };


  const validateDeathRattle = () => {
    const end = new Date(project.end_date);
    const fieldsErrors = {};
    if (project.end_date === null) fieldsErrors.end_date = 'End date is required field.';
    else if (end - curDate > 0) fieldsErrors.end_date = 'You can not select end date more than current.';
    return Object.keys(fieldsErrors).length ? fieldsErrors : false;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const validateErrors = validateMilestone();
    if (validateErrors) {
      setErrors(validateErrors);
    } else {
      try {
        if (isEdit) {
          await dispatch(addMilestone({ ...project, project_uuid: curProject.uuid, rate: project.rate !== '' ? project.rate : 0 }));
        } else if (initialMilestone && curProject.uuid) {
          if (projectId) {
            await axios.put(`/project/${curProject.uuid}`, { ...curProject, workStart: curProject.workStart || new Date('2020-06-03 05:00:32.945000 +00:00'), curProject: curProject.workEnd || new Date('2020-06-03 15:00:32.952000 +00:00') });
            await dispatch(updateMilestone({ ...project, project_uuid: curProject.uuid, rate: project.rate !== '' ? project.rate : 0 }));
            await dispatch(getProject(curProject.uuid));
          } else {
            // milestoneEdit(initialMilestone, project);
            if (newProjectId) {
              await axios.put(`/project/${curProject.uuid}`, { ...curProject, workStart: curProject.workStart || new Date('2020-06-03 05:00:32.945000 +00:00'), curProject: curProject.workEnd || new Date('2020-06-03 15:00:32.952000 +00:00') });
              await dispatch(updateMilestone({ ...project, project_uuid: newProjectId, rate: project.rate !== '' ? project.rate : 0 }));
              await dispatch(getProject(curProject.uuid));
            }
          }
        } else {
          milestonesChange({ ...project, project_uuid: curProject.uuid, rate: project.rate !== '' ? project.rate : 0 });
          if (newProjectId) await dispatch(getProject(newProjectId));
          if (curProject.uuid) {
            await dispatch(addMilestone({ ...project, project_uuid: curProject.uuid, rate: project.rate !== '' ? project.rate : 0 }));
            await axios.put(`/project/${curProject.uuid}`, { ...curProject, workStart: curProject.workStart || new Date('2020-06-03 05:00:32.945000 +00:00'), curProject: curProject.workEnd || new Date('2020-06-03 15:00:32.952000 +00:00') });
            if (projectId) await dispatch(getProject(curProject.uuid));
            else if (newProjectId) await dispatch(getProject(newProjectId));
          }
        }
        if (projectView) {
          await dispatch(updateMilestone({ ...project, project_uuid: newProjectId, rate: project.rate !== '' ? project.rate : 0 }));
          await dispatch(getProject(curProject.uuid));
        }
        setProject(initialValue);
        setIsError(false);
        // setArchive(false);
        setAddUserModalOpen(false);
        // await dispatch(getProject(curProject.uuid));
        if (allProjects) {
          dispatch(getProjects());
        }
      } catch {}
    }
  };


  const handleArchive = async (e) => {
    e.preventDefault();
    const validateErrors = validateDeathRattle();
    if (validateErrors) {
      setErrorsDeathRattle(validateErrors);
    } else {
      await dispatch(updateMilestone({ ...project, status: 'Archived', end_date: project.end_date }));
      await dispatch(getProject(curProject.uuid));
      setArchive(false);
    }
  };

  const userChange = (user) => { setProject({ ...project, user_uuid: user ? user.uuid : '', Users: user }); };
  const startDateChange = (startDate) => { setProject({ ...project, start_date: startDate }); };
  const endDateChange = (endDate) => {
    setErrorsDeathRattle({ ...errorsDeathRattle, end_date: '' });
    setProject({ ...project, end_date: endDate });
  };

  let curPerson;

  if (curProject.Person !== undefined) {
    curPerson = curProject.Person.find((item) => item.uuid === project.person_uuid);
  } else curPerson = '';

  const curRateType = project.rate_type ? paymentTypes.find((item) => item.value === project.rate_type) : '';

  if (archive) {
    return (
      <div className={classes.position}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={false}
          onClose={handleCancel}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={false}>
            <div className={clsx(classes.paper, classes.modalWidth)}>
              <form className={classes.root}>
                <TextField
                  value={project.comment || ''}
                  label="Post mortem"
                  variant="outlined"
                  inputProps={{ 'aria-label': 'description' }}
                  className={classes.inputForm}
                  name='comment'
                  onChange={handleChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      error={Boolean(errorsDeathRattle.end_date)}
                      helperText={errorsDeathRattle.end_date}
                      className={clsx(classes.formControl, classes.inputForm)}
                      style={{ width: '100%' }}
                      inputVariant="outlined"
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      autoOk
                      margin="normal"
                      onChange={endDateChange}
                      value={project.end_date}
                      label="End Date"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleArchive}
                    className={classes.submitButton}
                  >
                    Archive
                  </Button>
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
  }
  return (
    <div className={classes.position}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={addUserModalOpen}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addUserModalOpen}>
          <div className={clsx(classes.paper, classes.modalWidth)}>
            <form className={classes.root} noValidate autoComplete="off">
              <h2 className={classes.header}>{project.name}</h2>
              <DevelopersChooseForm
                name='Developers'
                userChange={userChange}
                developersValue={project.user_uuid}
                isEdit
                forRead={forRead}
                isError={errors.user_uuid}
              />
              <Autocomplete
                style={{ paddingTop: '5px' }}
                options={curProject.Person}
                onChange={handlePersonChange}
                getOptionLabel={(option) => `${option.name}`}
                renderInput={(params) => <TextField {...params} label="Person" variant="outlined" />}
                value={curPerson || null}
                // renderInput={(params) => (
                //   <TextField
                //     error={!developersValue && isError}
                //     helperText={!developersValue && isError ? 'Empty field.' : ''}
                //     {...params}
                //     label={name}
                //     variant="outlined"
                //   />
                // )}
              />

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                  <TextField
                    error={Boolean(errors.role)}
                    helperText={errors.role}
                    value={project.role || ''}
                    label="Role"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='role'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                  <TextField
                    error={Boolean(errors.load)}
                    helperText={errors.load}
                    type="number"
                    value={project.load || ''}
                    label="Load"
                    variant="outlined"
                    className={classes.inputForm}
                    name='load'
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
                    // error={!project.rate && isError}
                    // helperText={(!project.rate && isError) ? 'Empty field.' : ''}
                    type="number"
                    value={project.rate || ''}
                    label="Rate"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='rate'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={paymentTypes}
                    getOptionLabel={(option) => option.label}
                    style={{ paddingTop: '5px' }}
                    renderInput={(params) => <TextField {...params} label="Rate Type" variant="outlined" />}
                    value={curRateType || null}
                    onChange={HandleRateTyoeChange}
                  />
                  {/* <FormControl
                    placeholder='Rate type'
                    variant="outlined"
                    className={clsx(classes.formControl, classes.inputForm)}
                  >
                    <InputLabel>Rate type</InputLabel>
                    <Select
                      labelWidth={47}
                      name='rate_type'
                      value={project.rate_type || ''}
                      onChange={handleChange}
                    >
                      {paymentTypes.map((role) => (
                        <MenuItem
                          value={role.value}
                          key={role.label}
                        >
                          {role.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    value={project.platform || ''}
                    autocomplete="platform"
                    id="platform"
                    label="Platform"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name="platform"
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardDatePicker
                  error={!project.start_date && isError}
                  helperText={(!project.start_date && isError) ? 'Empty field.' : ''}
                  className={clsx(classes.formControl, classes.inputForm)}
                  style={{ width: '100%' }}
                  inputVariant="outlined"
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  autoOk
                  margin="normal"
                  value={project.start_date}
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
                  value={project.end_date}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />

              </MuiPickersUtilsProvider>
              <div className={classes.buttons}>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleAdd}
                  className={classes.submitButton}
                >
                  Submit
                </Button>
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
}
