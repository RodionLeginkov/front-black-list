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
import AddMilestonesForm from '../../components/AddMilestonesForm/AddMilestonesForm.jsx';
import './ProjectStyles.css';
import AddPersonModal from '../../components/AddPersonModal/AddPersonModal.jsx';
import PersonsList from '../../components/PersonsList/PersonsList.jsx';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    maxWidth: '750px',
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

  const initialValue = (projectId && curProject) ? curProject : {
    name: '',
    communication: '',
    source: '',
    start_date: new Date(),
    end_date: null,
    type: '',
    withdrawal_of_funds: '',
    customer: '',
    description: '',
    history: '',
    ProjectMilestones: [],
    Person: [],
  };
  const initialMilestones = (projectId && curProject) ? curProject.ProjectMilestones : [];

  const [projectMilestones, setProjectMilestones] = useState(initialMilestones);
  const [project, setProject] = useState(initialValue);

  const [isError] = useState(false);
  useEffect(() => {
    setProject(initialValue);
    setProjectMilestones(initialMilestones);
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    if (projectId && (!curProject || !curProject.Persons)) {
      dispatch(getProjects());
      dispatch(getProject(projectId));
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

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const milestonesChange = (newMilestone) => {
    setProjectMilestones([...projectMilestones, newMilestone]);
    setProject({ ...project, ProjectMilestones: [...project.ProjectMilestones, newMilestone] });
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
      dispatch(updateProject(project));
      dispatch(getProject(project.uuid));
      history.push(`/customers/${project.uuid}`);
    } else {
      const response = await axios.post('/project', project);
      setProject({ ...project, uuid: response.data.uuid });
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
              <div className={classes.smallForm} />


              <Grid style={{ margin: '0px 0px 10px' }} container justify="space-between">

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

              </Grid>

              <TextField
                error={Boolean(errors.description)}
                helperText={errors.description}
                style={{ marginBottom: '10px' }}
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
                    />
                  </TabPanel>

                  <TabPanel value={value} index={1}>
                    <PersonsList
                      personDelete={personDelete}
                      personChange={personChange}
                      projectPersons={project.Person}
                      projectId={project.uuid}
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
                      setProjectMilestones={setProjectMilestones}
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
        setPersonModalOpen={setPersonModalOpen}
        personModalOpen={personModalOpen}
        projectId={project.uuid}
        personAdd={personAdd}
      />
    </>
  );
};

export default AddProjectPage;
