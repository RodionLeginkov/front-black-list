import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory, Link, Redirect } from 'react-router-dom';
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const userAuth = useSelector((state) => state.auth);
  const [form, setState] = useState({
    email: '',
    password: '',
  });

  const onChangheEmail = (e) => {
    setState({
      ...form,
      email: e.target.value,
    });
  };

  const onChanghePassword = (e) => {
    setState({
      ...form,
      password: e.target.value,
    });
  };


  const onSubmit = (e) => {
    e.preventDefault();
    const login = {
      email: form.email,
      password: form.password,
    };
    dispatch(signIn(login));
  };
  if (userAuth && userAuth.loggedIn) {
    window.location = '/';
    // history.push('/projects');
  }
  // if (userAuth && userAuth.user) {
  //   // console.log(localStorage.getItem('token'));
  //   if (localStorage.getItem('token') != null) history.push('/');
  // }

  // console.log(userAuth);
  // if (userAuth && userAuth.user) {
  // console.log(userAuth.user.token);
  // if (localStorage.getItem('token') != null) return (<Redirect to="/" />);
  // if (userAuth.user.token != null) return (<Redirect to="/" />);
  // }


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
          />
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
            <Grid item>
              <Link to="/signup">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}
