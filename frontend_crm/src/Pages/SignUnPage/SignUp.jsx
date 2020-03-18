import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import { useHistory, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signUp } from '../../Redux/Actions/AuthActions/AuthActions.js';

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
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const userAuth = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [form, setState] = useState({
    email: '',
    password: '',
    fullName: '',

  });


  const onChangheEmail = (e) => {
    setState({
      ...form,
      email: e.target.value,
    });
  };

  const onChangheName = (e) => {
    setState({
      ...form,
      fullName: e.target.value,
    });
  };

  const onChanghePassword = (e) => {
    setOpen(false);
    setState({
      ...form,
      password: e.target.value,
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length > 6) {
      const login = {
        email: form.email,
        password: form.password,
        fullName: form.fullName,
      };
      // console.log(login);
      dispatch(signUp(login));
    } else {
      setOpen(true);
    }
    //
  };
  if (userAuth && userAuth.user) {
    window.location = '/signin';
    // history.push('/signin');
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
          Sign up
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
            id="fullName"
            label="Name"
            name="Name"
            autoComplete="Name"
            autoFocus
            value={form.fullName}
            onChange={onChangheName}
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
            onClick={handleClick}
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
            <Typography className={classes.typography}>Password must be more than 6 characters.</Typography>
          </Popover>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid>
              <Link to="/signin" variant="body2">
                Get back
              </Link>
            </Grid>

          </Grid>

        </form>
      </div>
    </Container>
  );
}
