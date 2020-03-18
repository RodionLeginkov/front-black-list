import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { addProject, updateProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import AddProjectForm from './AddProjectForm';

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
    isOpen, 
    setIsOpen, 
    curProject, 
    isEdit,
  } = props;

  const initialValue = isEdit ? curProject : {
    name: '', status: '', paymentAmount: '', stack: [], description: '', _id: '', duration: '',
    paymentType: '', developers: [],
  };
  
  const [project, setProject] = useState(initialValue);
  const classes = useStyles();
  const dispatch = useDispatch();


  const handleClose = () => {
    setProject(initialValue);
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
      setProject(initialValue);
    }
    setIsOpen(false);
  };

  // const handleCancel = (e) => {
  //   e.preventDefault();
  //   setProject(initialValue);
  //   setIsOpen(false);
  // };

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
            <AddProjectForm project={project} projectChange={handleChange} stackChange={stackChange} developersChange={developersChange} submit={onSubmit}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
