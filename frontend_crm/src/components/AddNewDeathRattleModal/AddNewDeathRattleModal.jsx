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
import axios from 'axios';
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

export default function AddNewDeathRattleModal(props) {
  const {
    curProject,
    initialMilestone,
    setArchive,
    deathRattleModelOpen,
    setDeathRattleModelOpen,
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
  const [project, setProject] = useState(initialValue);


  const [errorsDeathRattle, setErrorsDeathRattle] = useState({
    end_date: '',
  });
  const handleCancel = (e) => {
    e.preventDefault();

    setErrorsDeathRattle({ ...errorsDeathRattle, end_date: '' });
    setProject(initialValue);
    setArchive(false);
    setDeathRattleModelOpen(false);
  };
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const validateDeathRattle = () => {
    const end = new Date(project.end_date);
    const fieldsErrors = {};
    if (project.end_date === null) fieldsErrors.end_date = 'End date is required field.';
    else if (end - curDate > 0) fieldsErrors.end_date = 'You can not select end date more than current.';
    return Object.keys(fieldsErrors).length ? fieldsErrors : false;
  };


  const handleArchive = async (e) => {
    e.preventDefault();
    const validateErrors = validateDeathRattle();
    if (validateErrors) {
      setErrorsDeathRattle(validateErrors);
    } else {
      try {
        await axios.put(`/project/${curProject.uuid}`, { ...curProject, workStart: curProject.workStart || new Date('2020-06-03 05:00:32.945000 +00:00'), curProject: curProject.workEnd || new Date('2020-06-03 15:00:32.952000 +00:00') });
        await dispatch(updateMilestone({ ...project, status: 'Archived', end_date: project.end_date }));
        dispatch(getProject(curProject.uuid));
        setArchive(false);
      } catch {}
    }
  };

  const endDateChange = (endDate) => {
    setErrorsDeathRattle({ ...errorsDeathRattle, end_date: '' });
    setProject({ ...project, end_date: endDate });
  };


  return (
    <div className={classes.position}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={deathRattleModelOpen}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deathRattleModelOpen}>
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
