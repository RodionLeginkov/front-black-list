import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '800px',
    width: '100%',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: '13 px',
    maxHeight: '40px',

  },
  typography: {
    padding: theme.spacing(2),
  },
  container: {
    marginTop: '50px',
    display: 'flex',
  },
  footer: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function ResetPassword(props) {
  const history = useHistory();
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
    if (form.password.length > 6 && (form.password === form.confirmPassword)) {
      try {
        const response = await axios.put('/users/updatePassword', {
          password: form.password,
          token: tokenId,
        });
        localStorage.setItem('token', response.data.token.accessToken);
        history.push('/');
        if (response.data.message === 'password updated') {
          setState({
            ...form,
            updated: true,
            error: false,

          });
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
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={classes.position} style={{ marginLeft: '85px' }}>
      <Container component="main" maxWidth="md" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          <form className={classes.form} onSubmit={updatePassword}>
            <Grid container direction="row" justify='space-between' spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="New password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={onChanghePassword}
                  onClick={handleClick}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Re-enter password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={form.confirmPassword}
                  onChange={onChanghePassword}
                  onClick={handleClick}
                />
              </Grid>
            </Grid>
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
            <div className={classes.footer}>
              <div style={{ marginTop: 20 }}>
                <Typography>
                  Your password must:
                </Typography>
                <ul>
                  <li><Typography>Be 6 to 20 characters long</Typography></li>
                  <li><Typography>May contain an accepted characters ! @ # $ ^ & *</Typography></li>
                </ul>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Reset password
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
