import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Redux/Actions/UsersActions/UserActions';


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
    width: '400px',
  },
  header: {
    color: '#777',
  },
}));

const AddProjectModal = ({
  isOpen, changeIsOpen, currentProjectIds, user, isError,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const [selectedProjects, setSelectedProjects] = useState(currentProjectIds);

  let filteredProjects = projects;
  for (const index in selectedProjects) {
    filteredProjects = filteredProjects.filter((project) => (
      project.name !== selectedProjects[index].name));
  }

  const handleCancel = (e) => {
    e.preventDefault();
    changeIsOpen();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, currentProject: selectedProjects }));
    changeIsOpen();
  };

  const handleChangeProject = (event, values) => {
    setSelectedProjects(values);
  };

  return (
    <div className={classes.position}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={changeIsOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={clsx(classes.paper, classes.modalWidth)}>
            <form className={classes.root} noValidate autoComplete="off">
              <h2 className={classes.header}>Attach project</h2>
              <Autocomplete
                multiple
                options={filteredProjects}
                getOptionLabel={(option) => option.name}
                value={selectedProjects}
                filterSelectedOptions
                onChange={handleChangeProject}
                renderInput={(params) => (
                  <TextField
                    error={selectedProjects.length === 0 && isError}
                    {...params}
                    variant="outlined"
                    label="Projects"
                  />
                )}
              />
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleAdd}
                  className={classes.submitButton}
                >
                  Apply
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
};

AddProjectModal.propTypes = {
  isOpen: PropTypes.bool,
  changeIsOpen: PropTypes.func,
  currentProjectIds: PropTypes.array,
  user: PropTypes.object,
  projectsIds: PropTypes.array,
  addProject: PropTypes.func,
  isError: PropTypes.bool,
};

export default AddProjectModal;
