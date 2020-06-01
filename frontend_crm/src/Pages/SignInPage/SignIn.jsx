import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import validator from 'validator';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signIn } from '../../Redux/Actions/AuthActions/AuthActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    padding: theme.spacing(2),
  },
}));


export default function SignUp() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userAuth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });


  const [emailError, setEmailError] = useState({
    err: false,
    message: '',
  });
  const [passwordError] = useState({
    err: false,
    message: '',
  });
  const [form, setState] = useState({
    email: '',
    password: '',
  });


  const validateUser = () => {
    const fieldsErrors = {};
    if (validator.isEmpty(form.email)) fieldsErrors.email = 'Email is required field.';
    else if (!validator.isEmail(form.email)) fieldsErrors.email = 'Invalid email.';
    if (validator.isEmpty(form.password)) fieldsErrors.password = 'Password is required field.';
    else if (form.password.length < 6) fieldsErrors.password = 'Invalid password.';
    return Object.keys(fieldsErrors).length ? fieldsErrors : false;
  };

  const [anchorEl] = React.useState(null);

  const onChangheEmail = (e) => {
    setErrors({ ...errors, email: '' });
    setState({
      ...form,
      email: e.target.value,
    });
  };

  const onChanghePassword = (e) => {
    setErrors({ ...errors, password: '' });
    setOpen(false);
    setState({
      ...form,
      password: e.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const login = {
      email: form.email,
      password: form.password,
    };
    const validateErrors = validateUser();
    if (validateErrors) {
      setErrors(validateErrors);
    } else {
      dispatch(signIn(login));
    }
  };

  if (userAuth && userAuth.loggedIn) {
    window.location = '/';
  }

  const id = open ? 'simple-popover' : undefined;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} onSubmit={onSubmit}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={form.email}
            onChange={onChangheEmail}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={onChanghePassword}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
          >
            <Typography className={classes.typography}>Password or email is wrong</Typography>
          </Popover>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}
