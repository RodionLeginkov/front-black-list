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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addMilestone, updateMilestone } from '../../Redux/Actions/MilestonesActions/MilestonesActions';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
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

export default function AddUserModal(props) {
  const {
    forRead,
    addUserModalOpen,
    setAddUserModalOpen,
    curProject,
    isEdit,
    initialMilestone,
    milestonesChange,
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
  };
  const [isError, setIsError] = useState(false);
  const [project, setProject] = useState(initialValue);
  const [errors, setErrors] = useState({
    user_uuid: '',
    load: '',
    role: '',
    // start_date: '',
  });
  const handleCancel = (e) => {
    e.preventDefault();
    setErrors({
      user_uuid: '',
      load: '',
      role: '',
      // start_date: '',
    });
    setIsError(false);
    setProject(initialValue);
    setAddUserModalOpen(false);
  };
  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setProject({ ...project, [e.target.name]: e.target.value });
  };


  const handlePersonChange = (e, values) => {
    setProject({ ...project, person_uuid: values ? values.uuid : null });
  }
  const validateMilestone = () => {
    const fieldsErrors = {};
    if (validator.isEmpty(project.user_uuid)) fieldsErrors.user_uuid = 'Developer is required field.';
    if (!project.load) fieldsErrors.load = 'Load is required field.';
    if (validator.isEmpty(project.role)) fieldsErrors.role = 'Role is required field.';
    else if (project.role.length > 50) fieldsErrors.role = 'Role field is too long.';
    // if (validator.isEmpty(project.start_date)) fieldsErrors.start_date = 'Last name is required field.';
    return Object.keys(fieldsErrors).length ? fieldsErrors : false;

  };

  const handleAdd = (e) => {
    e.preventDefault();
    const validateErrors = validateMilestone();
    if (validateErrors) {
      setErrors(validateErrors);
    } else {
      if (isEdit) {
        dispatch(addMilestone({ ...project, project_uuid: curProject.uuid, rate: project.rate !== '' ? project.rate : 0 }));
      } else if (initialMilestone) {
        dispatch(updateMilestone({ ...project, project_uuid: curProject.uuid, rate: project.rate !== '' ? project.rate : 0 }));
        dispatch(getProject(curProject.uuid));
      } else {
        milestonesChange({ ...project, project_uuid: curProject.uuid, rate: project.rate !== '' ? project.rate : 0 });
        if (curProject.uuid) {
          dispatch(addMilestone({ ...project, project_uuid: curProject.uuid, rate: project.rate !== '' ? project.rate : 0 }));
        }
      }

      setProject(initialValue);
      setIsError(false);
      setAddUserModalOpen(false);
    }
  };


  const userChange = (user) => { setProject({ ...project, user_uuid: user ? user.uuid : '', Users: user }); };
  const startDateChange = (startDate) => { setProject({ ...project, start_date: startDate }); };
  const endDateChange = (endDate) => { setProject({ ...project, end_date: endDate }); };
  // console.log('tetetetete', curProject);
  let curPerson;

  if (curProject.Person !== undefined) curPerson = curProject.Person.find((item) => item.uuid === project.person_uuid);
  else curPerson = '';
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
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
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
                  {/* <TextField
                    error={!project.unit && isError}
                    helperText={(!project.unit && isError) ? 'Empty field.' : ''}
                    value={project.unit || ''}
                    label="Unit"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='unit'
                    onChange={handleChange}
                  /> */}
                  <FormControl
                    // error={!project.rate_type && isError}
                    // helperText={(!project.rate_type && isError) ? 'Empty field.' : ''}
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
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    // error={!project.rate && isError}
                    // helperText={(!project.rate && isError) ? 'Empty field.' : ''}
                    value={project.platform || ''}
                    label="Platform"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='platform'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    // error={!project.rate && isError}
                    // helperText={(!project.rate && isError) ? 'Empty field.' : ''}
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
                    // error={!project.rate && isError}
                    // helperText={(!project.rate && isError) ? 'Empty field.' : ''}
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
