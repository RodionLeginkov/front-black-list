import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import InputAdornment from '@material-ui/core/InputAdornment';
import Loading from '../../components/Loading';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { getUsers, updateUser, getUser } from '../../Redux/Actions/UsersActions/UserActions';
import { userRoles } from '../../constants/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    maxWidth: '700px',
  },
  breadcrumbs: {
    margin: '85px 20px 40px 0px',
    color: '#777777',
  },
  link: {
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
    maxHeight: '200px',
    width: '100%',
  },
}));

const EditUserPage = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = match.params;
  const curUser = useSelector((state) => state.users.currentUser);
  const loading = useSelector((state) => state.users.loadingCurrentUser);
  const projects = useSelector((state) => state.projects.projects);

  const [isError, setIsError] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);


  const initialValue = (userId && curUser) ? curUser : {
    fullName: '',
    role: '',
    englishLevel: '',
    email: '',
    project_ready: '',
    current_task: '',
    current_occupation: '',
    phone1: '',
    phone2: '',
    skype: '',
    github: '',
    stack: [],
    currentProject: [],
    dataofLeave: '',
    comment: '',
    firstName: '',
    lastName: '',
    firedAt: null,
    hiredAt: null,
    Skills: [],
  };


  const reqFields = [
    'email',
    'role',
    'firstName',
    'lastName',
    'hiredAt'];

  const [user, setUser] = useState(initialValue);
  useEffect(() => {
    setUser(initialValue);
  }, [loading]);

  useEffect(() => {
    if (userId && !curUser) {
      dispatch(getUsers());
      dispatch(getUser(userId));
    }
  }, [curUser, dispatch, userId]);

  if (loading) {
    return (<Loading />);
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // const handleChangeStack = ((event, values) => {
  //   setUser({ ...user, Skills: values });
  // });

  // const handleChangeProject = (event, values) => {
  //   setUser({ ...user, currentProject: values });
  // };

  const startDateChange = (hiredAt) => { setOpenStartDatePicker((isOpen) => !isOpen); setUser({ ...user, hiredAt }); };

  const endDateChange = (firedAt) => { setOpenEndDatePicker((isOpen) => !isOpen); setUser({ ...user, firedAt }); };

  const onSubmit = (e) => {
    e.preventDefault();
    const isEmpty = reqFields.find((field) => (!user[field]));
    if (isEmpty === undefined) {
      dispatch(updateUser(user));
      history.push(`/user/${userId}`);
    } else setIsError(true);
  };

  let filteredProjects = projects;
  for (const index in user.currentProject) {
    filteredProjects = filteredProjects.filter((project) => (
      project.name !== user.currentProject[index].name));
  }


  return (
    <>
      {!userId
        ? (
          <Breadcrumbs style={{ marginLeft: '85px' }} aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Typography className={classes.link} onClick={() => history.push('/users')}>
              Users
            </Typography>
          </Breadcrumbs>
        )
        : (
          <Breadcrumbs style={{ marginLeft: '85px' }} aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Typography className={classes.link} onClick={() => history.push('/users')}>
              Users
            </Typography>
            <Typography className={classes.link} onClick={() => history.push(`/user/${userId}`)}>
              {user.firstName}
              {' '}
              {user.lastName}
            </Typography>
            <Typography color="textPrimary">
              Edit
            </Typography>
          </Breadcrumbs>
        )}
      <div className={classes.position} style={{ marginLeft: '85px' }}>
        <Paper className={classes.root}>
          <div className={clsx(classes.content, classes.header)}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
              <h2>Edit user</h2>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={{ marginBottom: 10 }}
                    value={user.firstName}
                    error={!user.firstName && isError}
                    helperText={(!user.firstName.length && isError) ? 'Empty field.' : ''}
                    label="User name"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='firstName'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={{ marginBottom: 10 }}
                    value={user.lastName}
                    label="User name"
                    error={!user.lastName && isError}
                    helperText={(!user.lastName.length && isError) ? 'Empty field.' : ''}
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='lastName'
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid spacing={2} container justify="space-between">
                <Grid item xs={12} sm={6}>
                  <FormControl

                    error={!user.role && isError}
                    helpertext={(!user.role.length && isError) ? 'Empty field.' : ''}

                    placeholder='Role'
                    variant="outlined"
                    className={clsx(classes.formControl, classes.inputForm)}
                  >
                    <InputLabel>Role</InputLabel>
                    <Select
                      labelWidth={47}
                      name='role'
                      value={user.role || ''}
                      onChange={handleChange}
                    >
                      {userRoles.map((role) => <MenuItem value={role.value} key={role.label}>{role.label}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>


                {/* Return this later */}
                {/* <Grid item xs={12} sm={6}>
                  <FormControl
                    className={clsx(classes.formControl, classes.inputForm)}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">English Level</InputLabel>
                    <Select
                      labelWidth={47}
                      name='englishLevel'
                      value={user.englishLevel || ''}
                      onChange={handleChange}
                    >
                      {englishLevels.map((level) => (
                        <MenuItem value={level} key={level}>{level}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid> */}


                <Grid item xs={12} sm={6}>
                  <TextField
                    error={!user.email && isError}
                    helperText={(!user.email.length && isError) ? 'Empty field.' : ''}
                    style={{ width: '100%' }}
                    value={user.email || ''}
                    variant="outlined"
                    label="Email"
                    name='email'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={{ width: '100%' }}
                    value={user.phone1 || ''}
                    variant="outlined"
                    label="Phone Number №1"
                    name='phone1'
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    style={{ width: '100%' }}
                    value={user.phone2 || ''}
                    variant="outlined"
                    label="Phone Number №2"
                    name='phone2'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={{ width: '100%' }}
                    value={user.project_ready || ''}
                    variant="outlined"
                    label="Project ready"
                    name='project_ready'
                    onChange={handleChange}
                    InputProps={{
                      endAdornment:
  <InputAdornment position="end">
    %
  </InputAdornment>,

                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={{ width: '100%' }}
                    value={user.current_task || ''}
                    variant="outlined"
                    label="Current Task"
                    name='current_task'
                    onChange={handleChange}
                  />
                </Grid>


                {/* Retern this later */}
                {/* <Grid item xs={12}>
                  <Autocomplete
                    style={{ margin: '5px 0px 10px' }}
                    multiple
                    options={stackList}
                    getOptionLabel={(option) => option}
                    defaultValue={user.Skills}
                    filterSelectedOptions
                    name='Skill'
                    onChange={handleChangeStack}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Skills"
                      />
                    )}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    style={{ width: '100%' }}
                    value={user.current_occupation || ''}
                    variant="outlined"
                    label="Current Occupation"
                    name='current_occupation'
                    onChange={handleChange}
                  />
                </Grid>


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={12} sm={6}>
                    <KeyboardDatePicker
                      style={{ width: '100%' }}
                      inputVariant="outlined"
                      error={!user.hiredAt && isError}

                      helperText={(!user.hiredAt && isError) ? 'Empty field.' : ''}

                      disableToolbar
                      // onClick={() => setOpenStartDatePicker((isOpen) => !isOpen)}
                      // open={openStartDatePicker}
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      label="Date of joining"
                      value={new Date(user.hiredAt) || ''}
                      onChange={startDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <KeyboardDatePicker
                      style={{ width: '100%' }}
                      inputVariant="outlined"
                      disableToolbar
                      // onClick={() => setOpenEndDatePicker((isOpen) => !isOpen)}
                      // open={openEndDatePicker}
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      label="Date of Leave"
                      value={user.firedAt}
                      onChange={endDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
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
};

EditUserPage.propTypes = {
  match: PropTypes.object,
  isError: PropTypes.bool,
};

export default EditUserPage;
