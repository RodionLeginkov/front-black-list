import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextField } from '@material-ui/core';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addMilestone, updateMilestone } from '../../Redux/Actions/MilestonesActions/MilestonesActions';
import { getUsers, updateUser, getUser } from '../../Redux/Actions/UsersActions/UserActions';
import DevelopersChooseForm from '../DevelopersChooseForm/index.jsx';
import { paymentTypes } from '../../constants/constants';

const useStyles = makeStyles((theme) => ({
  modal: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: '20px 40px',
  },
  position: {
    display: 'flex',
    alignItems: 'Center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13 px',
  },
  submitButton: {
    marginTop: '20px',
  },
  modalWidth: {
    width: '600px',
  },
  header: {
    color: '#777',
  },
  inputForm: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '0px',
    paddingBottom: '0px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  },
}));

export default function UserPostMortemModal(props) {
  const {
    user,
    setUser,
    userPostMortemOpen,
    setUserPostMortemOpen,
    initialValue,
    userId,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postMortem, setPostMortem] = useState('');
  const curDate = new Date();

  const [errorsDeathRattle, setErrorsDeathRattle] = useState({
    firedAt: '',
  });
  const handleCancel = (e) => {
    e.preventDefault();
    setPostMortem('');
    setUser({
      ...user, firedAt: initialValue.firedAt, current_task: initialValue.current_task, isActive: true,
    });
    setUserPostMortemOpen(false);
  };
  const handleChange = (e) => {
    setPostMortem(e.target.value);
    setUser({ ...user, current_task: e.target.value });
  };


  const validateDeathRattle = () => {
    const end = new Date(user.firedAt);
    const fieldsErrors = {};
    if (user.firedAt === null) fieldsErrors.firedAt = 'End date is required field.';
    else if (end - curDate > 0) fieldsErrors.firedAt = 'You can not select fired date more than current.';

    return Object.keys(fieldsErrors).length ? fieldsErrors : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validateDeathRattle();
    if (validateErrors) {
      setErrorsDeathRattle(validateErrors);
    } else {
      try {
        await dispatch(updateUser(user));
        await dispatch(getUser(userId));
        setUserPostMortemOpen(false);
      } catch {}
    }
  };

  const endDateChange = (endDate) => {
    setErrorsDeathRattle({ ...errorsDeathRattle, firedAt: '' });
    setUser({ ...user, firedAt: endDate });
  };


  return (
    <div className={classes.position}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={userPostMortemOpen}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={userPostMortemOpen}>
          <div className={clsx(classes.paper, classes.modalWidth)}>
            <form className={classes.root}>
              <TextField
                value={postMortem}
                label="Post mortem"
                variant="outlined"
                inputProps={{ 'aria-label': 'description' }}
                className={classes.inputForm}
                name='current_task'
                onChange={handleChange}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    error={Boolean(errorsDeathRattle.firedAt)}
                    helperText={errorsDeathRattle.firedAt}
                    className={clsx(classes.formControl, classes.inputForm)}
                    style={{ width: '100%' }}
                    inputVariant="outlined"
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    autoOk
                    margin="normal"
                    onChange={endDateChange}
                    value={user.firedAt}
                    label="End Date"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                  className={classes.submitButton}
                >
                  Archive
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submitButton}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
