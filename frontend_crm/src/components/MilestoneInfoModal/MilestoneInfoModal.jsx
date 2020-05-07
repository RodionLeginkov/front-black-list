import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextField } from '@material-ui/core';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DevelopersChooseForm from '../DevelopersChooseForm/index.jsx';
import { paymentTypes } from '../../constants/constants';
import './styles.css';

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
    color: 'black',
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

const MilestoneInfoModal = (props) => {
  const {
    project, openModal, setOpenModal, customer,
  } = props;
  const classes = useStyles();
  const handleCancel = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };
  let paymentType;
  if (project.rate_type === 'hourly' || project.rate_type === 'flat_rate' || project.rate_type === 'fixed' || project.rate_type === 'weekly') {
    paymentType = `${project.rate_type !== '' ? paymentTypes.find((item) => item.value === project.rate_type).label : '―'}`;
  } else {
    paymentType = '―';
  }
  // const paymentType = paymentTypes.find((item) => item.value === project.rate_type).label;
  let createDate = new Date(project.start_date);
  let endDate = new Date(project.end_date);
  createDate = createDate.toLocaleString('en-GB', { hour12: false });
  endDate = project.end_date !== null ? endDate.toLocaleString('en-GB', { hour12: false }) : '― / ― / ―';

  let curPerson;

  if (project.person_uuid !== null) {
    curPerson = customer.Person.find((item) => item.uuid === project.person_uuid);
    curPerson = curPerson.name;
  } else curPerson = '―';

  return (
    <div className={classes.position}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={clsx(classes.paper, classes.modalWidth)}>
            <form className={classes.root} noValidate autoComplete="off">
              <h2 className={classes.header}>{project.name}</h2>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} style={{ paddingBottom: 0 }}>
                  <DevelopersChooseForm
                    show
                    name='Developers'
                    developersValue={project.user_uuid}
                    isEdit
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} style={{ paddingBottom: 0 }}>
                  <TextField
                    show
                    name='Person'
                    variant="outlined"
                    label="Person"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    value={curPerson}

                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                  <TextField
                    value={project.role || '―'}
                    label="Role"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={`${classes.inputForm} disabled-color`}
                    name='role'
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                  <TextField
                    type="number"
                    disabled
                    value={project.load || '―'}
                    label="Load"
                    variant="outlined"
                    className={classes.inputForm}
                    name='load'
                    InputProps={{
                      endAdornment:
  <InputAdornment position="end">
    hr/week
  </InputAdornment>,

                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    disabled
                    value={project.rate || '―'}
                    label="Rate"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='rate'
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    value={paymentType}
                    label="Rate type"
                    disabled
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='rate'
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    value={project.platform || '―'}
                    label="Platform"
                    variant="outlined"
                    disabled
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='platform'
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
                  <TextField
                    value={project.withdraw || '―'}
                    label="Withdraw"
                    disabled
                    variant="outlined"
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='withdraw'
                  />
                </Grid>
                <Grid item xs={12} sm={12} style={{ paddingTop: 0 }}>
                  <TextField
                    value={project.comment || '―'}
                    label="Comment"
                    variant="outlined"
                    disabled
                    inputProps={{ 'aria-label': 'description' }}
                    className={classes.inputForm}
                    name='comment'

                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} style={{ paddingTop: 0 }}>
                <TextField
                  value={createDate || '―'}
                  label="Start date"
                  disabled
                  variant="outlined"
                  inputProps={{ 'aria-label': 'description' }}
                  className={classes.inputForm}
                  name='comment'
                />
              </Grid>
              <Grid item xs={12} sm={12} style={{ paddingTop: 0 }}>
                <TextField
                  value={endDate || '―'}
                  label="End date"
                  disabled
                  variant="outlined"
                  inputProps={{ 'aria-label': 'description' }}
                  className={classes.inputForm}
                  name='comment'
                />
              </Grid>
              <div className={classes.buttons}>
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
};

export default MilestoneInfoModal;
