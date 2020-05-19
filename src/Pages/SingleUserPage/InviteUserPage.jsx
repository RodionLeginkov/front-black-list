import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import validator from 'validator';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import Loading from '../../components/Loading/index.jsx';
import { userRoles } from '../../constants/constants';
import {
  getUsers, AddUser,
} from '../../Redux/Actions/UsersActions/UserActions';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    maxWidth: '700px',
  },
  breadcrumbs: {
    margin: '85px 20px',
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
  },
  descriptionForm: {
    maxHeight: '200px',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  const [isError] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    role: '',
    hiredAt: '',
    email: '',
  });
  const initialValue = (userId && curUser) ? curUser : {
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    phone1: '',
    hiredAt: new Date(),
  };

  const [user, setUser] = useState(initialValue);
  useEffect(() => {
    setUser(initialValue);
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    dispatch(getUsers('', '', '', true, '', ''));
    // eslint-disable-next-line
  }, [curUser, dispatch, userId]);

  if (loading) {
    return (<Loading />);
  }

  const validateClient = () => {
    const fieldsErrors = {};
    if (validator.isEmpty(user.role)) fieldsErrors.role = 'Role is required field.';
    if (validator.isEmpty(user.firstName)) fieldsErrors.firstName = 'First name is required field.';
    if (validator.isEmpty(user.lastName)) fieldsErrors.lastName = 'Last name is required field.';
    if (!validator.isEmail(user.email) && !validator.isEmpty(user.email)) {
      fieldsErrors.email = 'Please enter email address in format: yourname@example.com';
    }
    return Object.keys(fieldsErrors).length ? fieldsErrors : false;
  };

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' });
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleChangeRole = (e, values) => {
    if (values !== null) {
      setErrors({ ...errors, role: '' });
      setUser({ ...user, role: values.value || '' });
    }
  };

  const startDateChange = (dataofJoining) => {
    setUser({ ...user, hiredAt: dataofJoining });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validateClient();
    if (validateErrors) {
      setErrors(validateErrors);
    } else {
      const login = {
        email: user.email || undefined,
        role: user.role,
        phone1: user.phone1,
        firstName: user.firstName,
        lastName: user.lastName,
        hiredAt: user.hiredAt,
      };
      dispatch(AddUser(login));
      dispatch(getUsers('', '', '', true, '', 'Active'));
      history.push('/users');
    }
  };


  let filteredProjects = projects;
  // eslint-disable-next-line no-restricted-syntax
  for (const index in user.currentProject) {
    filteredProjects = filteredProjects.filter((project) => (
      project.name !== user.currentProject[index].name));
  }

  return (
    <>
      {!userId
        ? (
          <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Typography className={classes.link} onClick={() => history.push('/users')}>
              Users
            </Typography>
            <Typography color="textPrimary" onClick={() => history.push('/users/inviteuser')}>Add user</Typography>
          </Breadcrumbs>
        )
        : (
          <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Typography className={classes.link} onClick={() => history.push('/users')}>
              Users
            </Typography>
            <Typography className={classes.link} onClick={() => history.push(`/user/${userId}`)}>
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
              <div className={classes.header}>
                <h2>Add user</h2>
                <Tooltip title='close'>
                  <Button>
                    <CloseSharpIcon style={{ color: '#a3a3a3' }} />
                  </Button>
                </Tooltip>
              </div>
              <Grid spacing={2} container justify="space-between">
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoFocus
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                    // style={{ marginBottom: 10 }}
                    value={user.firstName}
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
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                    value={user.lastName}
                    label="User surname"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='lastName'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  {/* <FormControl
                    error={!user.role && isError}
                    helpertext={(!user.role && isError) ? 'Empty field.' : ''}
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
                      {userRoles.map((role) => (
                        <MenuItem
                          value={role.value}
                          key={role.label}
                        >
                          {role.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  <Autocomplete
                    options={userRoles}
                    onChange={handleChangeRole}
                    getOptionLabel={(option) => `${option.label}`}
                    // value={user.role || null}
                    renderInput={(params) => (
                      <TextField
                        error={Boolean(errors.role)}
                        helperText={errors.role}
                        {...params}
                        label='Role'
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    style={{ width: '100%' }}
                    value={user.email}
                    variant="outlined"
                    label="Email"
                    name='email'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    style={{ width: '100%' }}
                    value={user.phone1}
                    variant="outlined"
                    label="Phone Number"
                    name='phone1'
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12} sm={6}>
                  <KeyboardDatePicker
                    error={!user.hiredAt && isError}
                    helperText={(!user.hiredAt && isError) ? 'Empty field.' : ''}
                    style={{ width: '100%' }}
                    inputVariant="outlined"
                    disableToolbar
                    variant="inline"
                    autoOk
                    format="dd/MM/yyyy"
                    margin="normal"
                    label="Date of joining"
                    value={user.hiredAt}
                    onChange={startDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
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
