import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, updateProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { TextField, Tooltip } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import StackForm from '../../components/Form/StackForm';
import DevelopersChooseForm from '../../components/DevelopersChooseForm';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import Loading from '../../components/Loading';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import MessengerForm from '../../components/MessengerForm/MessengerForm.jsx';
import { getProject, getProjects } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import IconButton from '@material-ui/core/IconButton';
import AddResourcesForm from '../../components/AddResourcesForm/AddResourcesForm.jsx'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './ProjectStyles.css'
import HelpOutlineSharpIcon from '@material-ui/icons/HelpOutlineSharp';

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
    maxWidth: '700px',
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
    margin: '5px 0',
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
    fontSize: '30px'
  }
}));
function AddProjectPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const projectId = props.match.params.projectId;
  const curProject = useSelector((state) => state.projects.currentProject);
  const loading = useSelector((state) => state.projects.loadingCurrentProjects);

  const initialValue = (projectId && curProject) ? curProject : {
    _id: '',
    status: '',
    stack: [],
    duration: '',
    group: [],
    name: '',
    communication: '',
    messenger: [],
    startDate: null,
    endDate: null,
    type: '',
    source: '',
    withdrawalOfFunds: '',
    owner: '',
    paymentType: '',
    paymentAmount: '',
    load: '',
    description: '',
    resources: [],
    history: '',
    projectImage: '',
    developers: [],
  };
  const reqFields = ['name', 'communication', 'startDate',
    'type', 'source', 'withdrawalOfFunds',
    'paymentType', 'paymentAmount', 'load', 'resources',]
  const [project, setProject] = useState(initialValue);
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    setProject(initialValue);
  }, [loading])


  useEffect(() => {
    if (projectId && !curProject) {
      dispatch(getProjects());
      dispatch(getProject(projectId));
      dispatch(getUsers());
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (projectId && curProject) setProject(curProject)
  // }, [dispatch])

  if (loading) {
    return <Loading />
    // (<h1 style={{marginTop: '200px'}}>LOADIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIING!</h1>)
  }


  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const stackChange = (stack) => setProject({ ...project, stack });
  // const withdrawalOfFundsChange = (withdrawalOfFunds) => setProject({ ...project, withdrawalOfFunds })
  const developersChange = (developers) => setProject({ ...project, developers });
  const messengerChange = (messenger) => setProject({ ...project, messenger });
  // const communicationChange = (communication) => setProject({ ...project, communication })
  const startDateChange = (startDate) => setProject({ ...project, startDate: startDate });
  const endDateChange = (endDate) => setProject({ ...project, endDate });
  const resChange = (newRes) => setProject({ ...project, resources: [...project.resources, newRes] })


  const onSubmit = (e) => {
    e.preventDefault();
    const isEmpty = reqFields.find((field) => { return (!project[field]) })
    if (isEmpty === undefined) {
      if (projectId) {
        dispatch(updateProject(project));
        history.push(`/projects/${project._id}`);
      } else {
        dispatch(addProject(project));
        history.push('/projects');
      }
    }
    else setIsError(true)
  };


  return (
    <>
      {!projectId ?
        <Breadcrumbs style={{ marginLeft: '85px' }} aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="inherit" onClick={() => history.push('/projects')}   >
            Projects
        </Link>
          <Typography color="textPrimary" onClick={() => history.push(`/projects/addproject`)} >Add new project</Typography>
        </Breadcrumbs> :
        <Breadcrumbs style={{ marginLeft: '85px' }} aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="inherit" onClick={() => history.push('/projects')}   >
            Projects
        </Link>
          <Link color="inherit" onClick={() => history.push(`/projects/${project._id}`)}   >
            {project.name}
          </Link>
          <Typography color="textPrimary" onClick={() => history.push(`/projects/editproject/${project._id}`)} >Edit project</Typography>
        </Breadcrumbs>}
      <div className={classes.position} style={{ marginLeft: '85px' }}>
        <Paper className={classes.root}>
          <div
            className={clsx(classes.content, classes.header)}
          >
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
              <h2>Add new project</h2>
              <TextField
                required
                style={{ marginBottom: 10 }}
                error={!project.name && isError}
                // helperText={(!project.name && isError) ? "Empty field." : ''}
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
                      <Tooltip title={'Project Name'}>
                        <HelpOutlineSharpIcon className={classes.helperIcon} />
                      </Tooltip>
                    </InputAdornment>

                }}
              />
              <div className={classes.smallForm}>
                <FormControl
                  placeholder='Status'
                  variant="outlined"
                  className={clsx(classes.formControl, classes.inputForm)}
                  style={{ paddingRight: 5 }}
                // error={!project.status && isError}
                // helperText={(!project.status && isError) ? "Empty field." : ''}
                >
                  <InputLabel >
                    Status
            </InputLabel>
                  <Select
                    className={classes.selectEmpty}
                    labelWidth={47}
                    name='status'
                    value={project.status}
                    endAdornment={
                      <InputAdornment position="end">
                        <HelpOutlineSharpIcon className={classes.helperIcon} />
                      </InputAdornment>
                    }
                    onChange={handleChange}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="onGoing">On going</MenuItem>
                    <MenuItem value="stopped">Stopped</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
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
                    endAdornment={
                      <InputAdornment position="end">
                        {" "}
                        <Select
                          disableUnderline={true}
                          style={{ minWidth: 0 }}
                          onChange={handleChange}
                          name='paymentType'
                          value={project.paymentType}
                        >
                          <MenuItem value={'hourly'}>hourly</MenuItem>
                          <MenuItem value={'flat rate'}>flat rate</MenuItem>
                          <MenuItem value={'fixed'}>fixed</MenuItem>
                        </Select>
                      </InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight"
                    }}
                    labelWidth={65}
                  />
                </FormControl>
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
              <Grid style={{ margin: '5px 0px 10px' }} container justify="space-between">
                <Grid item xs={6}>
                  <FormControl
                    style={{ width: '100%', paddingRight: 5 }}
                    placeholder='Duration'
                    variant="outlined"
                    className={clsx(classes.formControl, classes.inputForm)}
                  // error={!project.duration && isError}
                  >
                    <InputLabel >
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
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    style={{ width: '100%', paddingLeft: 5 }}
                    placeholder='Format of communication'
                    variant="outlined"
                    className={clsx(classes.formControl, classes.inputForm)}
                    error={!project.communication && isError}
                    required
                  >
                    <InputLabel >
                      Format of communication
            </InputLabel>
                    <Select
                      className={classes.selectEmpty}
                      labelWidth={170}
                      name='communication'
                      value={project.communication || ''}
                      onChange={handleChange}
                    >
                      <MenuItem value="Only written">Only written</MenuItem>
                      <MenuItem value="Calls">Calls</MenuItem>
                      <MenuItem value="Video calls">Video calls</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <MessengerForm
                name='messenger'
                messengerChange={messengerChange}
                messengerValue={project.messenger}
                projectId
              // isError={isError}
              />
              {projectId ? <StackForm
                name='stack'

                stackChange={stackChange}
                stackValue={project.stack}
                isEdit
                projectId
              /> : ' '}
              <Grid style={{ margin: '5px 0px 10px' }} container justify="space-between">
                <Grid item xs={6}>
                  <TextField
                    style={{ width: '100%', paddingRight: 5 }}
                    value={project.type}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Type"
                    error={!project.type && isError}
                    required
                    // helperText={(!project.status && isError) ? "Empty field." : ''}
                    multiline
                    rowsMax="5"
                    name='type'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>

                  <FormControl
                    placeholder='Source'
                    variant="outlined"
                    required
                    className={clsx(classes.formControl)}
                    style={{ paddingLeft: 5, width: '100%' }}
                    required
                    error={!project.source && isError}
                  // helperText={(!project.status && isError) ? "Empty field." : ''}
                  >
                    <InputLabel >
                      Source
            </InputLabel>
                    <Select
                      className={classes.selectEmpty}
                      labelWidth={47}
                      name='source'
                      value={project.source}
                      onChange={handleChange}
                    >
                      <MenuItem value="upwork">Upwork</MenuItem>
                      <MenuItem value="angelList">AngelList</MenuItem>
                      <MenuItem value="linkedIn">LinkedIn</MenuItem>
                      {/* <MenuItem value="extraLeads">extra-leads</MenuItem> */}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid style={{ margin: '10px 0px' }} container justify="space-between">
                <Grid item xs={4}>
                  <FormControl
                    placeholder='Withdrawal of funds'
                    variant="outlined"
                    // className={clsx( classes.inputForm)}
                    style={{ width: '100%', paddingRight: '10px' }}
                    error={!project.withdrawalOfFunds && isError}
                    required
                  // helperText={(!project.status && isError) ? "Empty field." : ''}
                  >
                    <InputLabel >
                      Withdrawal of funds
                    </InputLabel>
                    <Select
                      className={classes.selectEmpty}
                      labelWidth={145}
                      name='withdrawalOfFunds'
                      value={project.withdrawalOfFunds || ''}
                      onChange={handleChange}
                    >
                      <MenuItem value="bankWire">Bank wire</MenuItem>
                      <MenuItem value="PayPal">PayPal</MenuItem>
                      <MenuItem value="pending">Payoneer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    // error={!project.owner && isError}
                    // helperText={(!project.status && isError) ? "Empty field." : ''}
                    style={{ width: '100%', paddingRight: '10px' }}
                    value={project.owner}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Owner"
                    multiline
                    rowsMax="5"
                    name='owner'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    style={{ width: '100%' }}
                    required
                    error={!project.load && isError}
                    // helperText={(!project.status && isError) ? "Empty field." : ''}
                    value={project.load}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Load"
                    multiline
                    rowsMax="5"
                    name='load'
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container style={{ margin: '10px 0px' }}>
                <Grid item xs={12}>
                  <DevelopersChooseForm
                    name='developers'
                    developersChange={developersChange}
                    developersValue={project.developers}
                  // isError={isError}
                  />
                </Grid>
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
                  />
                </Grid> */}
              </Grid>
              <TextField

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
              <div >
                <MuiPickersUtilsProvider utils={DateFnsUtils} style={{marginTop:'-6px'}}>
                  <Grid container  >
                    <Grid item xs={6}>
                      <KeyboardDatePicker
                        style={{ width: '100%', marginTop:'10px'}}
                        // name="startDate"
                        inputVariant="outlined"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        required
                        label="Start date"
                        error={!project.startDate && isError}
                        value={project.startDate}
                        onChange={startDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                    {projectId ? <Grid item xs={6} style={{ paddingLeft: '10px' }}>
                      <KeyboardDatePicker
                        style={{ width: '100%', marginTop: '10px' }}
                        inputVariant="outlined"
                        disableToolbar
                        // name="endDate"
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"

                        label="End date"
                        value={project.endDate}
                        onChange={endDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid> : ''}
                  </Grid>
                  <AddResourcesForm project={project} resChange={resChange} isError={isError} />
                </MuiPickersUtilsProvider>
              </div>
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

export default AddProjectPage