import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import validator from 'validator';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import HelpOutlineSharpIcon from '@material-ui/icons/HelpOutlineSharp';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import axios from 'axios';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  getProject, getProjects, updateProject,
} from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';
import AddMilestonesForm from '../../components/AddMilestonesForm/AddMilestonesForm.jsx';
import './ProjectStyles.css';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TimezonePicker from 'react-timezone';
import moment from 'moment-timezone';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { CommunicationType } from '../../constants/constants';
import PersonsList from '../../components/PersonsList/PersonsList.jsx';
import AddPersonModal from '../../components/AddPersonModal/AddPersonModal.jsx';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    maxWidth: '1100px',
  },
  breadcrumbs: {
    margin: '85px 20px',
    color: '#777777',
    cursor: 'pointer',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: '20px 40px',
  },
  content: {
    margin: '0px 20px',
    display: 'flex',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  position: {
    display: 'flex',
    alignItems: 'Center',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '13 px',
  },
  submitButton: {
    width: '30%',
    margin: '20px 0',
  },
  inputForm: {
    width: '100%',
    marginBotton: '5px',
  },
  descriptionForm: {
    maxHeight: '200px',
    width: '100%',
  },
  smallForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  helperIcon: {
    color: '#a3a3a3',
    cursor: 'default',
    fontSize: '30px',
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AddProjectPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [newProjectId, setNewProjectId] = useState();
  const { projectId } = props.match.params;
  const curProject = useSelector((state) => state.projects.currentProject);
  const loading = useSelector((state) => state.projects.loadingCurrentProjects);
  const [personModalOpen, setPersonModalOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    customer: '',
  });
  const initialValue = ((projectId && curProject) || (newProjectId && curProject)) ? curProject : {
    name: '',
    communication: '',
    source: '',
    start_date: new Date(),
    end_date: null,
    type: '',
    withdrawal_of_funds: '',
    customer: '',
    communicationType: null,
    communicationIntensity: '',
    workStart: new Date('2020-06-03 05:00:32.945000 +00:00'),
    workEnd: new Date('2020-06-03 15:00:32.952000 +00:00'),
    timezone: '',
    description: '',
    history: '',
    ProjectMilestones: [],
    Person: [],
  };
  const initialMilestones = (projectId && curProject) || (newProjectId && curProject) ? curProject.ProjectMilestones : [];

  const [projectMilestones, setProjectMilestones] = useState(initialMilestones);
  const [project, setProject] = useState(initialValue);

  const [isError] = useState(false);
  useEffect(() => {
    setProject(initialValue);
    setProjectMilestones(initialMilestones);
    // eslint-disable-next-line
  }, [loading]);

  const curCommunicationType = project.communicationType ? CommunicationType.find((item) => item.value === project.communicationType) : null;
  const HandleCommunicationTypeChange = (e, values) => {
    setProject({ ...project, communicationType: values ? values.value : null });
  };


  const timeZones = moment.tz.names();
  const offsetTmz = [];

  for (const i in timeZones) {
    offsetTmz.push(` (GMT${moment.tz(timeZones[i]).format('Z')})${timeZones[i]}`);
  }

  useEffect(() => {
    if (projectId && (!curProject || !curProject.Persons)) {
      dispatch(getProjects());
      dispatch(getProject(projectId));
    }
    if (!projectId) {
      dispatch(getUsers('', '', '', '', '', 'Active'));
    }

    // eslint-disable-next-line
  }, [dispatch]);
  const validateProject = () => {
    const fieldsErrors = {};
    if (validator.isEmpty(project.name)) fieldsErrors.name = 'Name is required field.';
    if (validator.isEmpty(project.customer)) fieldsErrors.customer = 'Customer is required field.';
    if (validator.isEmpty(project.description)) fieldsErrors.description = 'Desctiption is required field.';

    return Object.keys(fieldsErrors).length ? fieldsErrors : false;
  };

  const handleWorkStartTimeChange = (e) => {
    setProject({ ...project, workStart: e });
  };
  const handleWorkEndTimeChange = (e) => {
    setProject({ ...project, workEnd: e });
  };

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const milestonesChange = (newMilestone) => {
    setProjectMilestones([...projectMilestones, newMilestone]);
    setProject({ ...project, ProjectMilestones: [...project.ProjectMilestones, newMilestone] });
  };

  const milestoneEdit = (initial, changed) => {
    const changedMilestones = project.ProjectMilestones;
    changedMilestones.splice(project.ProjectMilestones.indexOf(initial), 1, changed);
    setProject({ ...project, ProjectMilestones: changedMilestones });
  };

  const personAdd = (newPerson) => {
    setProject({ ...project, Person: [...project.Person, newPerson] });
  };

  const personDelete = (deletedPerson) => {
    const filteredPersons = project.Person.filter((person) => person !== deletedPerson);
    setProject({ ...project, Person: filteredPersons });
  };
  const personChange = (initialPerson, changedPerson) => {
    const changedPersons = project.Person;
    changedPersons.splice(project.Person.indexOf(initialPerson), 1, changedPerson);
    setProject({ ...project, Person: changedPersons });
  };

  const handleClose = () => (projectId ? history.push(`/customers/${project.uuid}`) : history.push('/customers'));

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const timeZoneHandle = (e, value) => {
    setProject({ ...project, timezone: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validateProject();
    if (validateErrors) {
      setErrors(validateErrors);
    } else if (project.uuid) {
      // eslint-disable-next-line no-restricted-syntax
      // for (const index in projectMilestones) {
      //   if (Number(index) + 1 > curProject.ProjectMilestones.length) {
      //     dispatch(addMilestone(projectMilestones[index]));
      //   }
      // }

      dispatch(updateProject({ ...project, workStart: project.workStart || new Date('2020-06-03 05:00:32.945000 +00:00'), workEnd: project.workEnd || new Date('2020-06-03 15:00:32.952000 +00:00') }));
      dispatch(getProject(project.uuid));
      history.push(`/customers/${project.uuid}`);
    } else {
      const response = await axios.post('/project', project);
      setProject({ ...project, uuid: response.data.uuid });
      setNewProjectId(response.data.uuid);
      // history.push('/customers');
    }
  };
  if (loading) {
    return '';
  }
  return (
    <>
      {!projectId
        ? (
          <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Typography color="textPrimary" onClick={() => history.push('/customers')}>Customers</Typography>
            <Typography color="textPrimary" onClick={() => history.push('/customers/addproject')}>Add new project</Typography>
          </Breadcrumbs>
        )
        : (
          <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Typography color="textPrimary" onClick={() => history.push('/customers')}>Customers</Typography>
            <Typography color="textPrimary" onClick={() => history.push(`/customers/${project.uuid}`)}>{project.name}</Typography>
            <Typography color="textPrimary" onClick={() => history.push(`/customers/editproject/${project.uuid}`)}>Edit project</Typography>
          </Breadcrumbs>
        )}
      <div className={classes.position}>
        <Paper className={classes.root}>
          <div
            className={clsx(classes.content, classes.header)}
          >
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
              <div className={classes.header}>
                {!projectId ? <h2>Add new project</h2> : <h2>Edit project</h2>}
                <Tooltip title='close'>
                  <Button onClick={handleClose}>
                    <CloseSharpIcon style={{ color: '#a3a3a3' }} />
                  </Button>
                </Tooltip>
              </div>


              {/* <div className={classes.smallForm} /> */}


              <Grid style={{ margin: '0px 0px 10px', paddingTop: '5px' }} container spacing={1} justify="space-between">
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    style={{ marginBottom: 10 }}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    value={project.name || ''}
                    label="Project Name"
                    className={classes.inputForm}
                    name='name'
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment:
  <InputAdornment position="end">
    <Tooltip title="Project Name">
      <HelpOutlineSharpIcon className={classes.helperIcon} />
    </Tooltip>
  </InputAdornment>,

                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(errors.customer)}
                    helperText={errors.customer}
                    style={{ width: '100%' }}
                    value={project.customer}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Customer"
                    multiline
                    rowsMax="5"
                    name='customer'
                    onChange={handleChange}
                  />
                </Grid>

                {/* </Grid> */}
                {/* <Grid style={{ margin: '0px 0px 10px', paddingTop: '5px' }} container justify="space-between" spacing={1}> */}

                <Grid item xs={6}>

                  <Autocomplete
                    id="combo-box-demo"
                    options={CommunicationType}
                    getOptionLabel={(option) => option.label}

                    renderInput={(params) => <TextField {...params} label="Communication Type" variant="outlined" />}
                    value={curCommunicationType || null}
                    onChange={HandleCommunicationTypeChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={project.communicationIntensity}
                    variant="outlined"
                    label="Communication Intensity"
                    multiline
                    rowsMax="5"
                    name='communicationIntensity'
                    className={classes.inputForm}
                    onChange={handleChange}
                  />
                </Grid>


                <Grid item xs={12}>
                  <TextField
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    // style={{ marginBottom: '10px' }}
                    value={project.description}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Description"
                    multiline
                    rowsMax="5"
                    className={classes.descriptionForm}
                    name='description'
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    // style={{ marginBottom: '10px' }}
                    value={project.location}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Location"
                    multiline
                    rowsMax="5"
                    className={classes.descriptionForm}
                    name='location'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    options={offsetTmz}
                    onChange={timeZoneHandle}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Timezone" variant="outlined" />}
                    value={project.timezone || ''}
                  />

                  {/* <TimezonePicker
                    className={classes.inputForm}
                    onChange={timeZoneHandle}
                    defaultValue="America/New_York"
                    unselectLabel="No Timezone"
                    inputProps={{
                      placeholder: 'Select Timezone...',
                      name: 'timezone',
                    }}
                    style={{
                      borderRadius: '0.5rem',
                      background: 'teal',
                      color: 'white',
                    }}
                  /> */}
                </Grid>
                <Grid item xs={12}><h2>Working hours:</h2></Grid>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={6}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="work-starts"
                      name='workStart'
                      label="From"
                      inputVariant="outlined"
                      className={classes.inputForm}
                      value={project.workStart ? project.workStart : new Date('2020-06-03 05:00:32.945000 +00:00')}
                      onChange={handleWorkStartTimeChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="work-ends"
                      name='workEnd'
                      label="Till"
                      inputVariant="outlined"
                      className={classes.inputForm}
                      value={project.workEnd ? project.workEnd : new Date('2020-06-03 15:00:32.952000 +00:00')}
                      onChange={handleWorkEndTimeChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>

              <Divider />
              { project.uuid ? (
                <>
                  <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="simple tabs example"
                    value={value}
                    onChange={handleChangeTab}
                  >
                    <Tab label="Resources" {...a11yProps(0)} />
                    <Tab label="Persons" {...a11yProps(1)} />
                    <Tab label="History" {...a11yProps(2)} />
                  </Tabs>

                  <TabPanel value={value} index={0}>
                    <AddMilestonesForm
                      setProject={setProject}
                      project={project}
                      projectMilestones={projectMilestones}
                      milestonesChange={milestonesChange}
                      isError={isError}
                      setProjectMilestones={setProjectMilestones}
                      isEdit
                      archived={false}
                      projectId={projectId}
                      newProjectId={newProjectId}
                      milestoneEdit={milestoneEdit}
                    />
                  </TabPanel>

                  <TabPanel value={value} index={1}>
                    <PersonsList
                      personDelete={personDelete}
                      personChange={personChange}
                      projectPersons={project.Person}
                      projectId={project.uuid}
                      newProjectId={newProjectId}
                      isEdit={projectId}
                      curProject={project}
                    />
                    <Button
                      style={{ marginBotton: 5 }}
                      variant="contained"
                      color="primary"
                      onClick={() => setPersonModalOpen(true)}
                      className={classes.button}
                      endIcon={<PersonAddSharpIcon />}
                    >
                      Add Person
                    </Button>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <AddMilestonesForm
                      setProject={setProject}
                      project={project}
                      projectMilestones={projectMilestones}
                      milestonesChange={milestonesChange}
                      isError={isError}
                      projectId={projectId}
                      newProjectId={newProjectId}
                      setProjectMilestones={setProjectMilestones}
                      milestoneEdit={milestoneEdit}
                      isEdit
                      archived
                    />
                  </TabPanel>
                </>
              ) : (
                ''
              )}

              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submitButton}
                >
                  {project.uuid ? 'Submit' : 'Add project'}
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      </div>
      <AddPersonModal
        curProject={project}
        setPersonModalOpen={setPersonModalOpen}
        personModalOpen={personModalOpen}
        projectId={project.uuid}
        newProjectId={newProjectId}
        personAdd={personAdd}
        isEdit={projectId}
      />
    </>
  );
};

export default AddProjectPage;
