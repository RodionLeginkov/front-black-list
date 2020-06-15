import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { inviteUsers } from '../../Redux/Actions/AuthActions/AuthActions';

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
}));

export default function Forgot() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setState] = useState({
    email: '',
    showError: false,
    messageFromServer: '',
    showNullError: false,
  });

  const validateUser = () => {
    const fieldsErrors = {};
    if (validator.isEmpty(form.email)) fieldsErrors.email = 'Email is required field.';
    else if (!validator.isEmail(form.email)) fieldsErrors.email = 'Invalid email.';
    return Object.keys(fieldsErrors).length ? fieldsErrors : false;
  };

  const [errors, setErrors] = useState({
    email: '',
  });

  const onChangheEmail = (e) => {
    setErrors({ ...errors, email: '' });
    setState({
      ...form,
      email: e.target.value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const validateErrors = validateUser();

    if (validateErrors) {
      setErrors(validateErrors);
    } else {
      await dispatch(inviteUsers({ email: form.email }));
      history.push('/');
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
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
            error={Boolean(errors.email)}
            helperText={errors.email}
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
