import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
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
  const [anchorEl] = React.useState(null);

  const onChangheEmail = (e) => {
    setState({
      ...form,
      email: e.target.value,
    });
  };

  const onChanghePassword = (e) => {
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
    if (!form.email.includes('@')) {
      setEmailError({
        ...form,
        err: true,
        message: 'where is @ ',
      });
    } else {
      setEmailError({
        ...form,
        err: false,
        message: '',
      });
    }
    dispatch(signIn(login));
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
            error={emailError.err}
            helperText={emailError.message}
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
            error={passwordError.err}
            helperText={passwordError.message}
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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
