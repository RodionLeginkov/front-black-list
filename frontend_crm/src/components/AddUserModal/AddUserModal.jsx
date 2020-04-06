import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
// import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';
// import NumberFormat from 'react-number-format';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
// import { userRoles, englishLevels, stackList } from '../../constants/constants';
import { addMilestone } from '../../Redux/Actions/MilestonesActions/MilestonesActions';
import DevelopersChooseForm from '../DevelopersChooseForm';
import {getProjects} from '../../Redux/Actions/ProjectsActions/ProjectActions'

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
    addUserModalOpen,
    setAddUserModalOpen,
    curProject,
    isEdit,
    milestonesChange,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  // const handleClose = () => {
  //   setAddUserModalOpen(false);
  // };

  const initialValue = {
    user_uuid: '',
    project_uuid: curProject.uuid,
    role: '',
    rate: null,
    unit: '',
    load: null,
    start_date: null,
    end_date: null,
  };

  const [project, setProject] = useState(initialValue);

  const handleCancel = (e) => {
    e.preventDefault();
    setProject(initialValue);
    setAddUserModalOpen(false);
  };


  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const reqFields = [
    'user_uuid',
    // 'project_uuid',
    'role',
    'rate',
    'unit',
    'load',
    'start_date',
  ]



  const handleAdd = (e) => {
    e.preventDefault();
    const isEmpty = reqFields.find((field) => (!project[field]));
    if (isEmpty === undefined) {
      if (isEdit) {
        dispatch(addMilestone(project))
      }
      else milestonesChange(project);
      setProject(initialValue);
      setAddUserModalOpen(false);
    } 
  };


  const userChange = (user) =>{setProject({ ...project, user_uuid: user ? user.uuid : '' })};

  const startDateChange = (startDate) => {setOpenStartDatePicker(isOpen => !isOpen); setProject({ ...project, start_date: startDate }); };
  const endDateChange = (endDate) => {setOpenEndDatePicker(isOpen => !isOpen); setProject({ ...project, end_date: endDate });};

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
                name='developers'
                userChange={userChange}
                developersValue={project.Users}
                isEdit
              />
              <Grid container spacing={1}>
                <Grid item item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                  <TextField
                    value={project.role || ''}
                    label="Role"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='role'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                  <TextField
                    type="number"
                    value={project.load || ''}
                    label="Load"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='load'
                    onChange={handleChange}
                    InputProps={{
                      endAdornment:
                        <InputAdornment position="end">
                          hr/day
  </InputAdornment>,

                    }}
                  />
                </Grid>
                <Grid item item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
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
                <Grid item item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    value={project.unit || ''}
                    label="Unit"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='unit'
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardDatePicker
                  className={clsx(classes.formControl, classes.inputForm)}
                  style={{ width: '100%' }}
                  inputVariant="outlined"
                  disableToolbar
                  onClick={() => setOpenStartDatePicker(isOpen => !isOpen)}
                  open={openStartDatePicker}
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  value={project.start_date}
                  label="Start Date"
                  onChange={startDateChange}
                  // KeyboardButtonProps={{
                  //   'aria-label': 'change date',
                  // }}
                />

                <KeyboardDatePicker
                  style={{ width: '100%' }}
                  inputVariant="outlined"
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"

                  onClick={() => setOpenEndDatePicker(isOpen => !isOpen)}
                  open={openEndDatePicker}
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
                  Add
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
