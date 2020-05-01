import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
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

export default function ResetPassword(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [form, setState] = useState({
    login: '',
    password: '',
    confirmPassword: '',
    update: false,
    isLoading: true,
    error: false,
    resetPasswordToken: '',
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const tokenId = props.match.params.token;

  const updatePassword = async (e) => {
    e.preventDefault();
    if (form.password.length > 6) {
      try {
        const response = await axios.put('/users/updatePasswordViaEmail', {
          login: form.login,
          password: form.password,
          resetPasswordToken: tokenId,
        });

        if (response.data.message === 'password updated') {
          setState({
            ...form,
            updated: true,
            error: false,

          });
          window.location = '/signin';
        } else {
          setState({
            ...form,
            updated: false,
            error: true,
          });
        }
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert('Something is going wrong');
      }
    } else {
      setOpen(true);
    }
  };

  const onChanghePassword = (e) => {
    setState({
      ...form,
      password: e.target.value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          sdfgedgsdgd
        </Typography>
        <form className={classes.form} onSubmit={updatePassword}>
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
            id="open"
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
            <Typography
              className={classes.typography}
            >
              Password must be more than 6 characters.
            </Typography>
          </Popover>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirm
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
