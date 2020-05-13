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
import validator from 'validator';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import DevelopersChooseForm from '../DevelopersChooseForm/index.jsx';
import ParticipantsList from '../ParticipantsList/ParticipantsList.jsx';

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

const AddPersonModal = (props) => {
  const {
    initialPerson,
    setPersonModalOpen,
    personModalOpen,
    personChange,
    projectId,
    personAdd,
  } = props;

  const dispatch = useDispatch();
  const classes = useStyles();

  const [person, setPerson] = useState(initialPerson || {
    project_uuid: projectId,
    name: '',
    description: '',
    start_date: new Date(),
    end_date: null,
    Participants: [],
  });

  const [errors, setErrors] = useState({
    name: '',
  });

  const validateProject = () => {
    const fieldsErrors = {};
    if (validator.isEmpty(person.name)) fieldsErrors.name = 'Name is required field.';
    return Object.keys(fieldsErrors).length ? fieldsErrors : false;
  };

  const userChange = (user) => { setPerson({ ...person, name: user !== null ? user.fullName : '' }); };
  const startDateChange = (startDate) => { setPerson({ ...person, start_date: startDate }); };
  const endDateChange = (endDate) => { setPerson({ ...person, end_date: endDate }); };
  const handleChange = (e) => setPerson({ ...person, [e.target.name]: e.target.value });
  const addParticipant = (participant) => setPerson({ ...person, Participants: [...person.Participants, participant] });

  const participantDelete = (deletedParticipant) => {
    const filteredParticipants = person.Participants.filter((participant) => participant !== deletedParticipant);
    setPerson({ ...person, Participants: filteredParticipants });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (initialPerson === undefined) {
      setPerson({
        project_uuid: projectId,
        name: '',
        description: '',
        start_date: new Date(),
        end_date: null,
        Participants: [],
      });
    } else {
      setPerson(initialPerson);
    }
    setPersonModalOpen(false);
  };

  const participantChange = (changedParticipant) => {
    const changedParticipants = person.Participants.map((item) => (item.uuid === changedParticipant.uuid ? changedParticipant : item));
    setPerson({ ...person, Person: changedParticipants });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const validateErrors = validateProject();
    if (validateErrors) setErrors(validateErrors);
    else if (projectId) {
      try {
        const response = await axios.post('/person', { ...person, project_uuid: projectId });
        setPerson({
          project_uuid: projectId,
          name: '',
          description: '',
          start_date: new Date(),
          end_date: null,
          Participants: [],
        });
        personAdd(response.data);
        // dispatch(getProject(projectId));
        setPersonModalOpen(false);
      } catch (error) {

      }
    } else {
      personAdd(person);
      setPerson({
        project_uuid: projectId,
        name: '',
        description: '',
        start_date: new Date(),
        end_date: null,
        Participants: [],
      });
      setPersonModalOpen(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const validateErrors = validateProject();
    if (validateErrors) setErrors(validateErrors);
    else if (projectId) {
      try {
        await axios.put(`/person/${person.uuid}`, person);
        dispatch(getProject(projectId));
        setPersonModalOpen(false);
      } catch (error) {

      }
    } else {
      personChange(initialPerson, person);
      setPerson({
        project_uuid: projectId,
        name: '',
        description: '',
        start_date: new Date(),
        end_date: null,
      });
      setPersonModalOpen(false);
    }
  };


  return (
    <div className={classes.position}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={personModalOpen}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={personModalOpen}>
          <div className={clsx(classes.paper, classes.modalWidth)}>
            <form className={classes.root} noValidate autoComplete="off">
              {/* <DevelopersChooseForm
                name='Person'
                userChange={userChange}
                developersValue={person.name}
                isParticipent
                isError={errors.name}
              /> */}
              <TextField
                value={person.name || ''}
                label="Person name"
                variant="outlined"
                inputProps={{ 'aria-label': 'description' }}
                style={{ width: '100%' }}
                name='name'
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              {/* <ParticipantsList
                participantDelete={participantDelete}
                personId={person.uuid}
                participants={person.Participants}
                addParticipant={addParticipant}
                participantChange={participantChange}
              /> */}
              <Grid container spacing={1}>
                <Grid item xs={12} style={{ paddingBottom: 0 }}>
                  <TextField
                    value={person.description || ''}
                    label="Description"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='description'
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
                  variant="inline"
                  format="dd/MM/yyyy"
                  autoOk
                  margin="normal"
                  value={person.start_date}
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
                  value={person.end_date}
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
                  onClick={initialPerson === undefined ? handleAdd : handleEdit}
                  className={classes.submitButton}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
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
};

export default AddPersonModal;
