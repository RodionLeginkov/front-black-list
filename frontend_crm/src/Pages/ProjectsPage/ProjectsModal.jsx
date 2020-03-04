import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import StackForm from '../../components/Form/StackForm';
import { addProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

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
  button: {
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
    maxHeight: '200px',
    width: '100%',
  },
  smallForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  modalWidth: {
    width: '700px',
  },
}));

export default function ProjectModal(props) {
  const { isOpen, setIsOpen } = props;
  const classes = useStyles();

  const [project, setProject] = useState({
    name: '', status: '', price: '', stack: [], description: '',
  });


  const dispatch = useDispatch();

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const stackChange = (stack) => setProject({ ...project, stack });

  const projectPush = (e) => {
    e.preventDefault();
    dispatch(addProject(project));
    setIsOpen(false);
    setProject({
      ...project, name: '', status: '', price: '', stack: [], description: '',
    });
  };

  return (
    <div className={classes.position}>
      <Modal

        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={clsx(classes.paper, classes.modalWidth)}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={projectPush}>
              <h2>Add new project</h2>
              <TextField label="Project Name"  variant="outlined" inputProps={{ 'aria-label': 'description' }} className={classes.inputForm} name='name' onChange={handleChange} />
              <div className={classes.smallForm}> 
                <FormControl label="Status" placeholder='Status' variant="outlined" className={clsx(classes.formControl, classes.inputForm)} style={{marginRight:5}}>
      
                  <Select
                    name='status'
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="onGoing">On going</MenuItem>
                    <MenuItem value="stopped">Stopped</MenuItem>
                  </Select>
                </FormControl>

                <TextField type="number" style={{marginLeft:5}} variant="outlined" label="Price" inputProps={{ 'aria-label': 'description' }} className={classes.inputForm} name='price' onChange={handleChange} />
              </div>
              <StackForm  name='stack' stackChange={stackChange} />
              <TextField
              variant="outlined"
                id="standard-multiline-flexible"
                label="Description"
                multiline
                rowsMax="5"
                className={classes.descriptionForm}
                name='description'
                onChange={handleChange}
              />
              <Button variant="contained" color="primary" type="submit" className={classes.submitButton}>
                Submit
              </Button>
            </form>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}
