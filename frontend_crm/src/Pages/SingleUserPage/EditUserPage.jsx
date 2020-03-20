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
import Loading from '../../components/Loading';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { getUsers, updateUser, getUser } from '../../Redux/Actions/UsersActions/UserActions';
import { userRoles, englishLevels, stackList } from '../../constants/constants';

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

const EditUserPage = ({ match, isError }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = match.params;
  const curUser = useSelector((state) => state.users.currentUser);
  const loading = useSelector((state) => state.users.loadingCurrentUser);
  const projects = useSelector((state) => state.projects.projects);

  const initialValue = (userId && curUser) ? curUser : {
    _id: '',
    fullName: '',
    role: '',
    englishLevel: '',
    email: '',
    phoneNumber: '',
    skype: '',
    github: '',
    stack: [],
    currentProject: [],
    dataofJoining: '',
    dataofLeave: '',
    comment: '',
  };

  const [user, setUser] = useState(initialValue);
  useEffect(() => {
    setUser(initialValue);
  }, [initialValue]);

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

  const handleChangeStack = ((event, values) => {
    setUser({ ...user, stack: values });
  });

  const handleChangeProject = (event, values) => {
    setUser({ ...user, currentProject: values });
  };

  const startDateChange = (dataofJoining) => setUser({ ...user, dataofJoining });

  const endDateChange = (dataofLeave) => setUser({ ...user, dataofLeave });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user));
    history.push(`/users/info/${userId}`);
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
            <Typography className={classes.link} onClick={() => history.push(`/users/info/${userId}`)}>
              {user.fullName}
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
              <TextField
                style={{ marginBottom: 10 }}
                value={user.fullName}
                label="User name"
                variant="outlined"
                inputProps={{ 'aria-label': 'description' }}
                className={classes.inputForm}
                name='fullName'
                onChange={handleChange}
              />
              <Grid spacing={2} container justify="space-between">
                <Grid item xs={12} sm={6}>
                  <FormControl
                    placeholder='Role'
                    variant="outlined"
                    className={clsx(classes.formControl, classes.inputForm)}
                  >
                    <InputLabel>Role</InputLabel>
                    <Select
                      labelWidth={47}
                      name='status'
                      value={user.status || ''}
                      onChange={handleChange}
                    >
                      {userRoles.map((role) => <MenuItem value={role} key={role}>{role}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={{ width: '100%' }}
                    value={user.email}
                    variant="outlined"
                    label="Email"
                    name='email'
                    onChange={handleChange}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={{ width: '100%' }}
                    value={user.phoneNumber}
                    variant="outlined"
                    label="Phone Number"
                    name='phoneNumber'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={{ width: '100%' }}
                    value={user.skype}
                    variant="outlined"
                    label="Skype"
                    name='skype'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={{ width: '100%' }}
                    value={user.github}
                    variant="outlined"
                    label="gitHub"
                    name='github'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    style={{ margin: '5px 0px 10px' }}
                    multiple
                    options={stackList}
                    getOptionLabel={(option) => option}
                    defaultValue={user.stack}
                    filterSelectedOptions
                    name='stack'
                    onChange={handleChangeStack}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Stack"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={filteredProjects}
                    getOptionLabel={(option) => option.name}
                    value={user.currentProject}
                    filterSelectedOptions
                    onChange={handleChangeProject}
                    renderInput={(params) => (
                      <TextField
                        error={user.currentProject.length === 0 && isError}
                        {...params}
                        variant="outlined"
                        label="Projects"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={user.comment}
                    variant="outlined"
                    label="Comment"
                    multiline
                    rowsMax="5"
                    className={classes.descriptionForm}
                    name='comment'
                    onChange={handleChange}
                  />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={12} sm={6}>
                    <KeyboardDatePicker
                      style={{ width: '100%' }}
                      inputVariant="outlined"
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      label="Date of joining"
                      value={user.dataofJoining}
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
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      label="Date of Leave"
                      value={user.dataofLeave ? user.dataofLeave : '01/01/2100'}
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
