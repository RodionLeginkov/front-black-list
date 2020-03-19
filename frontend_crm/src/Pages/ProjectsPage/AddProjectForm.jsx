import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DevelopersChooseForm from '../../components/DevelopersChooseForm';
import StackForm from '../../components/Form/StackForm';

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
  inputForm: {
    width: '100%',
    margin: '5px 0',
  },
  descriptionForm: {
    marginTop: '5px',
    maxHeight: '200px',
    width: '100%',
  },
  smallForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  // modalWidth: {
  //   width: '700px',
  // },
}));


export default function AddProjectForm(props) {
  const {
    project, projectChange, stackChange, developersChange, submit,
  } = props;
  const classes = useStyles();

  const priceRef = useRef();


  useEffect(() => {
    priceRef.current.querySelector("[name = 'name']").focus();
  }, []);


  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={submit}>
      <h2>Add new project</h2>
      <TextField
        ref={priceRef}
        value={project.name}
        label="Project Name"
        variant="outlined"
        inputProps={{ 'aria-label': 'description' }}
        className={classes.inputForm}
        name='name'
        onChange={projectChange}
        width
      />
      <div className={classes.smallForm}>
        <FormControl
          placeholder='Status'
          variant="outlined"
          className={clsx(classes.formControl, classes.inputForm)}
          style={{ marginRight: 5 }}
        >
          <InputLabel>
            Status
          </InputLabel>
          <Select
            labelWidth={47}
            name='status'
            value={project.status}
            onChange={projectChange}
            className={classes.selectEmpty}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="onGoing">On going</MenuItem>
            <MenuItem value="stopped">Stopped</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          placeholder='Duration'
          variant="outlined"
          className={clsx(classes.formControl, classes.inputForm)}
        >
          <InputLabel>
            Duration
          </InputLabel>
          <Select
            name='duration'
            className={classes.selectEmpty}
            value={project.duration}
            onChange={projectChange}
            labelWidth={62}
          >
            <MenuItem value='1-3 months'>1-3 months</MenuItem>
            <MenuItem value='3-6 months'>3-6 months</MenuItem>
            <MenuItem value='6-12 months'>6-12 months</MenuItem>
            <MenuItem value='Unexpected'>Unexpected</MenuItem>
          </Select>
        </FormControl>
        {/* <TextField
            value={project.price || ''}
            type="number"
            style={{ marginLeft: 5 }}
            variant="outlined"
            label="Price"
            inputProps={{ 'aria-label': 'description' }}
            className={classes.inputForm}
            name='price'
            onChange={projectChange}
          /> */}
        <FormControl
          style={{ marginLeft: 5 }}
          className={clsx(classes.formControl, classes.inputForm)}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">Payment</InputLabel>
          <OutlinedInput
            style={{ paddingRight: 9 }}
            value={project.paymentAmount}
            onChange={projectChange}
            name='paymentAmount'
            endAdornment={(
              <InputAdornment position="end" disableUnderline>
                {' '}
                <Select
                  disableUnderline
                  style={{ minWidth: 0 }}
                  onChange={projectChange}
                  name='paymentType'
                >
                  <MenuItem value="hourly">hourly</MenuItem>
                  <MenuItem value="flat rate">flat rate</MenuItem>
                  <MenuItem value="fixed">fixed</MenuItem>
                </Select>
              </InputAdornment>
              )}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            labelWidth={65}
          />
        </FormControl>
      </div>
      <StackForm
        name='stack'
        stackChange={stackChange}
        stackValue={project.stack}
        isEdit
      />
      <DevelopersChooseForm
        name='developers'
        developersChange={developersChange}
        developersValue={project.developers}
        isEdit
      />
      <TextField
        value={project.description}
        variant="outlined"
        id="standard-multiline-flexible"
        label="Description"
        multiline
        rowsMax="5"
        className={classes.descriptionForm}
        name='description'
        onChange={projectChange}
      />
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submitButton}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submitButton}
          onClick={projectChange}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
