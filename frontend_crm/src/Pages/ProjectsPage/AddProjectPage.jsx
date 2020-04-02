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
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  getProject, getProjects, addProject, updateProject,
} from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';
import AddMilestonesForm from '../../components/AddMilestonesForm/AddMilestonesForm.jsx';
import { addMilestone } from '../../Redux/Actions/MilestonesActions/MilestonesActions';
import './ProjectStyles.css';
import HelpOutlineSharpIcon from '@material-ui/icons/HelpOutlineSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';


const useStyles = makeStyles((theme) => ({
  modal: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    width: '100%',
    margin: '0 auto',
    maxWidth: '750px',
  },
  breadcrumbs: {
    margin: '85px 20px 40px 0px',
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
    // marginTop: '100px',
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
    // margin: '5px 0',
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
function AddProjectPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectId } = props.match.params;
  const curProject = useSelector((state) => state.projects.currentProject);
  const loading = useSelector((state) => state.projects.loadingCurrentProjects);


  const initialValue = (projectId && curProject) ? curProject : {
    // status: '',
    // stack: [],
    // duration: '',
    // group: [],
    name: '',
    communication: '',
    source: '',
    start_date: null,
    end_date: null,
    type: '',
    withdrawal_of_funds: '',
    customer: '',
    // messenger: [],
    // paymentType: '',
    // paymentAmount: '',
    // load: '',
    description: '',
    // resources: []
    history: '',
    // Skills: [],
    Projects_Milestones: [],
    // projectImage: '',
    // developers: [],

  };
  const initialMilestones = (projectId && curProject) ? curProject.Projects_Milestones : [];


  // const reqFields = ['name', 'communication', 'startDate',
  //   'type', 'source', 'withdrawal_of_funds',
  //   'paymentType', 'paymentAmount', 'load', 'resources'];
  const [projectMilestones, setProjectMilestones] = useState(initialMilestones);
  const [project, setProject] = useState(initialValue);
  const [isError] = useState(false);
  useEffect(() => {
    setProject(initialValue);
    setProjectMilestones(initialMilestones);
  }, [loading]);

  useEffect(() => {
    if (projectId && !curProject) {
      dispatch(getProjects());
      dispatch(getProject(projectId));
    }
    dispatch(getUsers());
  }, [dispatch]);


  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // const stackChange = (stack) => setProject({ ...project, stack });
  // // const withdrawal_of_fundsChange = (withdrawal_of_funds) => setProject({ ...project, withdrawal_of_funds })
  // const developersChange = (developers) => setProject({ ...project, developers });
  // const messengerChange = (messenger) => setProject({ ...project, messenger });
  // // const communicationChange = (communication) => setProject({ ...project, communication })
  // // const startDateChange = (startDate) => setProject({ ...project, startDate: startDate });
  // const startDateChange = (startDate) => { const date = new Date(startDate); setProject({ ...project, start_date: startDate }); };
  // const endDateChange = (endDate) => setProject({ ...project, end_date: endDate });
  const milestonesChange = (newMilestone) => {
    setProjectMilestones([...projectMilestones, newMilestone]);
    setProject({ ...project, Projects_Milestones: [...project.Projects_Milestones, newMilestone] });
  };

  const handleClose = () => (projectId ? history.push(`/projects/${project.uuid}`) : history.push('/projects'));

  // const handleChangeStack = ((event, values) => {
  //   setProject({ ...project, Skills: values });
  // });

  // console.log('TEST PRoject', project)
  // console.log('TEST projectMilestones', projectMilestones)


  const onSubmit = (e) => {
    e.preventDefault();
    // const isEmpty = reqFields.find((field) => (!project[field]));
    // if (isEmpty === undefined) {
    // console.log(project)
    // console.log('Skills' in project); // true
    if (projectId) {
      // delete project.Projects_Milestones;
      for (const index in projectMilestones) {
        if (Number(index) + 1 > curProject.Projects_Milestones.length) {
          dispatch(addMilestone(projectMilestones[index]));
        }
      }
      dispatch(updateProject(project));
      dispatch(getProject(projectId));
      history.push(`/projects/${project.uuid}`);
    } else {
      dispatch(addProject(project));
      history.push('/projects');
    }
    // } else setIsError(true);
  };


  return (
    <>
      {!projectId
        ? (
          <Breadcrumbs style={{ marginLeft: '85px' }} aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Link color="inherit" onClick={() => history.push('/projects')}>
              Projects
            </Link>
            <Typography color="textPrimary" onClick={() => history.push('/projects/addproject')}>Add new project</Typography>
          </Breadcrumbs>
        )
        : (
          <Breadcrumbs style={{ marginLeft: '85px' }} aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Link color="inherit" onClick={() => history.push('/projects')}>
              Projects
            </Link>
            <Link color="inherit" onClick={() => history.push(`/projects/${project.uuid}`)}>
              {project.name}
            </Link>
            <Typography color="textPrimary" onClick={() => history.push(`/projects/editproject/${project.uuid}`)}>Edit project</Typography>
          </Breadcrumbs>
        )}
      <div className={classes.position} style={{ marginLeft: '85px' }}>
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
                required
                style={{ marginBottom: 10 }}
                error={!project.name && isError}
                // helpertext={(!project.name && isError) ? "Empty field." : ''}
                value={project.name || ''}
                label="Project Name"
                variant="outlined"
                inputProps={{ 'aria-label': 'description' }}
                className={classes.inputForm}
                name='name'
                onChange={handleChange}

                InputProps={{
                  endAdornment:
  <InputAdornment position="end">
    <Tooltip title="Project Name">
      <HelpOutlineSharpIcon className={classes.helperIcon} />
    </Tooltip>
  </InputAdornment>,

                }}
              />
              <div className={classes.smallForm}>
                {/* <FormControl
                  placeholder='Status'
                  variant="outlined"
                  className={clsx(classes.formControl, classes.inputForm)}
                  style={{ paddingRight: 5 }}
                // error={!project.status && isError}
                // helpertext={(!project.status && isError) ? "Empty field." : ''}
                >
                  <InputLabel>
                    Status
                  </InputLabel>
                  <Select
                    className={classes.selectEmpty}
                    labelWidth={47}
                    name='status'
                    value={project.status}
                    endAdornment={(
                      <InputAdornment position="end">
                        <HelpOutlineSharpIcon className={classes.helperIcon} />
                      </InputAdornment>
                    )}
                    onChange={handleChange}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="onGoing">On going</MenuItem>
                    <MenuItem value="stopped">Stopped</MenuItem>
                  </Select>
                </FormControl> */}
                {/* <FormControl
                  required
                  error={(!project.paymentAmount || !project.paymentType) && isError}
                  style={{ paddingLeft: 5 }}
                  className={clsx(classes.formControl, classes.inputForm)}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">Payment</InputLabel>
                  <OutlinedInput
                    type="number"
                    style={{ paddingRight: 9 }}
                    value={project.paymentAmount}
                    onChange={handleChange}
                    // error={!project.communication && isError}
                    name='paymentAmount'
                    endAdornment={(
                      <InputAdornment position="end">
                        {' '}
                        <Select
                          disableUnderline
                          style={{ minWidth: 0 }}
                          onChange={handleChange}
                          name='paymentType'
                          value={project.paymentType}
                        >
                          <MenuItem value="hourly">hourly</MenuItem>
                          <MenuItem value="flat rate">flat rate</MenuItem>
                          <MenuItem value="fixed">fixed</MenuItem>
                        </Select>
                      </InputAdornment>
                    )}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    labelWidth={65}
                  />
                </FormControl> */}
              </div>
              {/* <Grid style={{ margin: '5px 0px 10px' }} container justify="space-between"> */}
              {/* <TextField
                style={{ width: '49%' }}
                value={project.communication}
                variant="outlined"
                id="standard-multiline-flexible"
                label="Format of communication"
                multiline
                rowsMax="5"
                name='communication'
                onChange={handleChange}
              /> */}
              {/* <Grid style={{ marginBotton: '5px ' }} container justify="space-between"> */}
              {/* <Grid item xs={6}>
                  <FormControl
                    style={{ width: '100%', paddingRight: 5 }}
                    placeholder='Duration'
                    variant="outlined"
                    className={clsx(classes.formControl, classes.inputForm)}
                  // error={!project.duration && isError}
                  >
                    <InputLabel>
                      Duration
                    </InputLabel>
                    <Select
                      name='duration'
                      className={classes.selectEmpty}
                      value={project.duration}
                      onChange={handleChange}
                      labelWidth={62}
                    >
                      <MenuItem value='1-3 months'>1-3 months</MenuItem>
                      <MenuItem value='3-6 months'>3-6 months</MenuItem>
                      <MenuItem value='6-12 months'>6-12 months</MenuItem>
                      <MenuItem value='Unexpected'>Unexpected</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}
              {/* <Grid item xs={4} >
                  <FormControl
                    style={{ width: '100%', paddingRight: 5 }}
                    placeholder='Format of communication'
                    variant="outlined"
                    className={clsx(classes.formControl, classes.inputForm)}
                    error={!project.communication && isError}
                    required
                  >
                    <InputLabel>
                      Format of communication
                    </InputLabel>
                    <Select
                      className={classes.selectEmpty}
                      labelWidth={170}
                      name='communication'
                      value={project.communication}
                      onChange={handleChange}
                    >
                      <MenuItem value="Only written">Only written</MenuItem>
                      <MenuItem value="Calls">Calls</MenuItem>
                      <MenuItem value="Video calls">Video calls</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}
              {/* </Grid> */}
              {/* <MessengerForm
                name='messenger'
                messengerChange={messengerChange}
                messengerValue={project.messenger}
                projectId
              // isError={isError}
              />
              {projectId ? (
                <StackForm
                  name='stack'

                  stackChange={stackChange}
                  stackValue={project.stack}
                  isEdit
                  projectId
                />
              ) : ' '} */}
              {/* <Grid style={{ margin: '5px 0px 10px' }} container justify="space-between"> */}
              {/* <Grid item xs={4}>
                  <TextField
                    style={{ width: '100%', paddingRight: 5 }}
                    value={project.type}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Type"
                    error={!project.type && isError}
                    required
                    helpertext={(!project.status && isError) ? "Empty field." : ''}
                    multiline
                    rowsMax="5"
                    name='type'
                    onChange={handleChange}
                  />
                </Grid> */}
              {/* <Grid item xs={4}>

                  <FormControl
                    placeholder='Source'
                    variant="outlined"
                    required
                    className={clsx(classes.formControl)}
                    style={{ width: '100%' }}
                    error={!project.source && isError}
                    helpertext={(!project.status && isError) ? "Empty field." : ''}
                  >
                    <InputLabel>
                      Source
                    </InputLabel>
                    <Select
                      className={classes.selectEmpty}
                      labelWidth={47}
                      name='source'
                      value={project.source || ''}
                      onChange={handleChange}
                    >
                      <MenuItem value="upwork">Upwork</MenuItem>
                      <MenuItem value="angelList">AngelList</MenuItem>
                      <MenuItem value="linkedIn">LinkedIn</MenuItem>
                      <MenuItem value="extraLeads">extra-leads</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid> */}

              <Grid style={{ margin: '0px 0px 10px' }} container justify="space-between">
                {/* <Grid item xs={6}>
                  <FormControl
                    placeholder='Withdrawal of funds'
                    variant="outlined"
                    // className={clsx( classes.inputForm)}
                    style={{ width: '100%', paddingRight: '5px' }}
                    error={!project.withdrawal_of_funds && isError}
                    required
                  // helpertext={(!project.status && isError) ? "Empty field." : ''}
                  >
                    <InputLabel>
                      Withdrawal of funds
                    </InputLabel>
                    <Select
                      className={classes.selectEmpty}
                      labelWidth={145}
                      name='withdrawal_of_funds'
                      value={project.withdrawal_of_funds || ''}
                      onChange={handleChange}
                    >
                      <MenuItem value="bankWire">Bank wire</MenuItem>
                      <MenuItem value="PayPal">PayPal</MenuItem>
                      <MenuItem value="pending">Payoneer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    // error={!project.customer && isError}
                    // helpertext={(!project.status && isError) ? "Empty field." : ''}
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
                {/* <Grid item xs={4}>
                  <TextField
                    style={{ width: '100%' }}
                    required
                    error={!project.load && isError}
                    // helpertext={(!project.status && isError) ? "Empty field." : ''}
                    value={project.load}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Load"
                    multiline
                    rowsMax="5"
                    name='load'
                    onChange={handleChange}
                  />
                </Grid> */}
              </Grid>
              {/* <Grid container style={{ margin: '10px 0px' }}>
                <Grid item xs={12}>
                  <DevelopersChooseForm
                    name='developers'
                    developersChange={developersChange}
                    developersValue={project.developers}
                  // isError={isError}
                  />
                </Grid> */}
              {/* <Grid item xs={6}>
                  <TextField
                    style={{ width: '100%', paddingLeft: '10px' }}
                    value={project.group}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Group"
                    multiline
                    rowsMax="5"
                    name='group'
                    onChange={handleChange}
                  />label

              {/* Return  this later */}
              {/* <Grid item xs={12}>
                <Autocomplete
                  style={{ margin: '5px 0px 10px' }}
                  multiple
                  options={stackList}
                  getOptionLabel={(option) => option}
                  defaultValue={project.Skills.name}
                  filterSelectedOptions
                  name='Skill'
                  // onChange={handleChangeStack}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Skills"
                    />
                  )}
                />
              </Grid> */}
              <TextField
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
              {/* <TextField
                value={project.history}
                variant="outlined"
                id="standard-multiline-flexible"
                label="History"
                multiline
                rowsMax="5"
                className={classes.descriptionForm}
                name='history'
                onChange={handleChange}
              /> */}
              {/* <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ marginTop: '-6px' }}>
                  <Grid container>
                    <Grid item xs={6}>
                      <KeyboardDatePicker
                        style={{ width: '100%', marginTop: '10px' }}
                        name="startDate"
                        inputVariant="outlined"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        required
                        label="Start date"
                        error={!project.start_date && isError}
                        value={project.start_date}
                        onChange={startDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                    {projectId ? (
                    <Grid item xs={6} style={{ paddingLeft: '10px' }}>
                      <KeyboardDatePicker
                        style={{ width: '100%', marginTop: '10px' }}
                        inputVariant="outlined"
                        disableToolbar
                        name="endDate"
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"

                        label="End date"
                        value={project.end_date}
                        onChange={endDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                    ) : ''}
                  </Grid>
                </MuiPickersUtilsProvider>
              </div> */}
              <Divider />
              <AddMilestonesForm setProject={setProject} project={project} projectMilestones={projectMilestones} milestonesChange={milestonesChange} isError={isError} setProjectMilestones={setProjectMilestones} isEdit />
              <Divider />
              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submitButton}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      </div>
    </>
  );
}

export default AddProjectPage;
