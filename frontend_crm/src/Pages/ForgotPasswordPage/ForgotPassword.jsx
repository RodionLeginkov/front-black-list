import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

export default function Forgot() {
  const classes = useStyles();
  const [form, setState] = useState({
    email: '',
    showError: false,
    messageFromServer: '',
    showNullError: false,
  });

  const onChangheEmail = (e) => {
    setState({
      ...form,
      email: e.target.value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      if (form.email === '') {
        setState({
          ...form,
          showError: false,
          messageFromServer: '',
          showNullError: false,
        });
      } else {
        const response = await axios.post(`${process.env.REACT_APP_BASE_API}users/forgotPassword`, { email: form.email });

        if (response.data === 'email not in db') {
          setState({
            ...form,
            showError: true,
            messageFromServer: '',
            showNullError: true,
          });
        } else if (response.data === 'recovery email sent') {
          setState({
            ...form,
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false,
          });
          alert('check your email');
          window.location = '/signin';
        }
      }
    } catch (err) {
      alert('letter sent to your mail');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} onSubmit={onSubmit}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change your password
        </Typography>
        <form className={classes.form} onSubmit={sendEmail}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={form.email}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChangheEmail}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Change your password
          </Button>


        </form>
        <Grid container>
          <Grid>
            <Link to="/signin" variant="body2">
              Get back
            </Link>
          </Grid>

        </Grid>
      </div>
    </Container>
  );
}
