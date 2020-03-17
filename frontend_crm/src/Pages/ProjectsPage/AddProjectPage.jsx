import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, updateProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import AddProjectForm from './AddProjectForm';
import { TextField } from '@material-ui/core';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import WithdrawalOfFundsForm from '../../components/WithdrawalOfFundsForm/WithdrawalOfFundsForm.jsx'
import MessagerForm from '../../components/MessagerForm/MessagerForm.jsx';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
}));
export default function AddProjectPage(props) {
  const projectId = props.match.params.projectId
  const allProjects = useSelector((state) => state.projects.projects)
  let curProject = null;
  if (projectId) (curProject = allProjects.find((p) => p._id === projectId))
  console.log('curProject', curProject)

  const initialValue = projectId ? curProject : {
    _id: '', status: '', stack: [],
    duration: '', group: [], name: '', comunication: [], messager: [],
    startDate: null, endDatе: null, type: '', source: '',
    withdrawalOfFunds: '', owner: '', paymentType: '', paymentAmount: null,
    load: '', description: '', resources: [], history: '',
    projectImage: '', developers: [],
  };

  const [project, setProject] = useState(initialValue);
  console.log('DEVELOPERS',project)
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();


  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const stackChange = (stack) => setProject({ ...project, stack });
  const withdrawalOfFundsChange = (withdrawalOfFunds) => setProject({ ...project, withdrawalOfFunds })
  const developersChange = (developers) => setProject({ ...project, developers });
  const messagerChange = (messager) => setProject({ ...project, messager });
  const comunicationChange = (comunication) => setProject({ ...project, comunication })
  const startDateChange = (startDate) => { console.log(typeof (startDate), startDate); setProject({ ...project, startDate }); }
  const endDateChange = (endDate) => setProject({ ...project, endDate });
  const onSubmit = (e) => {
    console.log('project', project)
    e.preventDefault();
    if (projectId) {
      dispatch(updateProject(project));
      history.push(`/projects/${project._id}`);
    } else {
      console.log('DATE', typeof (project.startDate))
      dispatch(addProject(project));
      setProject(initialValue);
      history.push('/projects');
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setProject(initialValue);
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
                value={project.name}
                label="Project Name"
                variant="outlined"
                inputProps={{ 'aria-label': 'description' }}
                className={classes.inputForm}
                name='name'
                onChange={handleChange}
              />
              <div className={classes.smallForm}>
                <FormControl
                  placeholder='Status'
                  variant="outlined"
                  className={clsx(classes.formControl, classes.inputForm)}
                  style={{ marginRight: 5 }}
                >
                  <InputLabel >
                    Status
            </InputLabel>
                  <Select
                    className={classes.selectEmpty}
                    labelWidth={47}
                    name='status'
                    value={project.status}
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
                  style={{ marginLeft: 5 }}
                  className={clsx(classes.formControl, classes.inputForm)}
                  variant="outlined"

                >
                  <InputLabel htmlFor="outlined-adornment-password">Payment</InputLabel>
                  <OutlinedInput
                    style={{ paddingRight: 9 }}
                    value={project.paymentAmount}
                    onChange={handleChange}
                    name='paymentAmount'
                    endAdornment={
                      <InputAdornment position="end" disableUnderline={true}>
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
                value={project.comunication}
                variant="outlined"
                id="standard-multiline-flexible"
                label="Format of comunication"
                multiline
                rowsMax="5"
                name='comunication'
                onChange={handleChange}
              /> */}
              <FormControl
                placeholder='Format of comunication'
                variant="outlined"
                className={clsx(classes.formControl, classes.inputForm)}
                style={{ marginRight: 10 }}
              >
                <InputLabel >
                  Format of comunication
            </InputLabel>
                <Select
                  className={classes.selectEmpty}
                  labelWidth={170}
                  name='comunication'
                  value={project.comunication}
                  onChange={handleChange}
                >
                  <MenuItem value="onlyWritten">Only written</MenuItem>
                  <MenuItem value="calls">Calls</MenuItem>
                  <MenuItem value="videoCalls">Video calls</MenuItem>
                </Select>
              </FormControl>
              <MessagerForm
                name='messager'
                messagerChange={messagerChange}
                messagerValue={project.messager}
                projectId
              />
              {/* <StackForm
                name='stack'
                stackChange={stackChange}
                stackValue={project.stack}
                projectId
              /> */}
              <Grid style={{ margin: '5px 0px 10px' }} container justify="space-between">
                <Grid item xs={6}>
                  <TextField
                    style={{ width: '100%', paddingRight: 5  }}
                    value={project.type}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Type"
                    multiline
                    rowsMax="5"
                    name='type'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    style={{ width: '100%', paddingLeft: 5  }}
                    value={project.source}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Source"
                    multiline
                    rowsMax="5"
                    name='source'
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <TextField
                style={{ width: '100%' }}
                value={project.resources}
                variant="outlined"
                id="standard-multiline-flexible"
                label="Resources"
                multiline
                rowsMax="5"
                name='resources'
                onChange={handleChange}
              />

              <Grid style={{ margin: '10px 0px' }} container justify="space-between">
                <Grid item xs={4}>
                  {/* <TextField
                    style={{ width: '100%', paddingRight: '10px' }}
                    value={project.withdrawalOfFunds}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Withdrawal of funds"
                    multiline
                    rowsMax="5"
                    name='withdrawalOfFunds'
                    onChange={handleChange}
                  /> */}
                  {/* <WithdrawalOfFundsForm
                    name='withdrawalOfFunds'
                    withdrawalOfFundsChange={withdrawalOfFundsChange}
                    withdrawalOfFundsValue={project.withdrawalOfFunds}
                    projectId
                  /> */}
                  <FormControl
                    placeholder='Withdrawal of funds'
                    variant="outlined"
                    // className={clsx( classes.inputForm)}
                    style={{ width: '100%', paddingRight: '10px' }}
                  >
                    <InputLabel >
                      Withdrawal of funds
            </InputLabel>
                    <Select
                      className={classes.selectEmpty}
                      labelWidth={47}
                      name='withdrawalOfFunds'
                      value={project.withdrawalOfFunds}
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
                    isEdit/>
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container  >
                    <Grid item xs={6}>
                      <KeyboardDatePicker
                        style={{ width: '100%', }}
                        // name="startDate"
                        inputVariant="outlined"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="Start date"
                        value={project.startDate}
                        onChange={startDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                    {/* <Grid item xs={6} style={{paddingLeft: '10px' }}>
                      <KeyboardDatePicker
                        style={{ width: '100%',}}
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
                    </Grid> */}
                  </Grid>
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

