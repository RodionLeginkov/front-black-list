import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import { useDispatch } from 'react-redux';
import StackForm from '../../components/Form/StackForm';
import DevelopersChooseForm from '../../components/DevelopersChooseForm';
import { addProject, updateProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

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
  modalWidth: {
    width: '700px',
  },
}));

export default function ProjectModal(props) {
  const {
    isOpen, setIsOpen, curProject, isEdit,
  } = props;
  const classes = useStyles();

  const initialValue = isEdit ? curProject : {
    name: '', status: '', price: '', stack: [], description: '', _id: '', duration: '', developers: [],
  };

  const [project, setProject] = useState(initialValue);

  const dispatch = useDispatch();

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const stackChange = (stack) => setProject({ ...project, stack });
  const developersChange = (developers) => setProject({ ...project, developers });
  

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateProject(project));
    } else {
      dispatch(addProject(project));
    }
    setIsOpen(false);
    setProject(initialValue);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setProject(initialValue);
    setIsOpen(false);
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
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
              <h2>Add new project</h2>
              <TextField
                value={project.name}
                label="Project Name"
                variant="outlined"
                inputProps={{ 'aria-label': 'description' }}
                className={classes.inputForm}
                name='name'
                onChange={handleChange}
              />
              <div className={classes.smallForm}>
                <FormControl
                  placeholder='Status'
                  variant="outlined"
                  className={clsx(classes.formControl, classes.inputForm)}
                  style={{ marginRight: 5 }}
                >
                  <InputLabel >
                    Status
                  </InputLabel>
                  <Select
                  labelWidth={47}
                    name='status'
                    value={project.status}
                    onChange={handleChange}
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
                  <InputLabel >
                    Duration
                  </InputLabel>
                  <Select
                    name='duration'
                    className={classes.selectEmpty}
                    value={project.duration}
                    onChange={handleChange}
                    labelWidth={62}
                  >
                    <MenuItem value='1-3 months'>1-3 months</MenuItem>
                    <MenuItem value='3-6 months'>3-6 months</MenuItem>
                    <MenuItem value='6-12 months'>6-12 months</MenuItem>
                    <MenuItem value='Unexpected'>Unexpected</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  value={project.price}
                  type="number"
                  style={{ marginLeft: 5 }}
                  variant="outlined"
                  label="Price"
                  inputProps={{ 'aria-label': 'description' }}
                  className={classes.inputForm}
                  name='price'
                  onChange={handleChange}
                />
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
                isEdit />
              <TextField
                value={project.description}
                variant="outlined"
                id="standard-multiline-flexible"
                label="Description"
                multiline
                rowsMax="5"
                className={classes.descriptionForm}
                name='description'
                onChange={handleChange}
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
