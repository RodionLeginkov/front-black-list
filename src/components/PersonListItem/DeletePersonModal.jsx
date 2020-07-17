import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

const DeletePersonModal = (props) => {
  const {
    handleClosePopUp, openPopUp, person, curProject, projectId, personDelete,
  } = props;
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    if (projectId) {
      await axios.put(`/project/${curProject.uuid}`, { ...curProject, workStart: curProject.workStart || new Date('2020-06-03 05:00:32.945000 +00:00'), curProject: curProject.workEnd || new Date('2020-06-03 15:00:32.952000 +00:00') });
      await axios.delete(`/person/${id}`);
      dispatch(getProject(projectId));
    } else {
      personDelete(person);
    }
  };
  return (
    <div>
      <Dialog
        open={openPopUp}
        onClose={handleClosePopUp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you really want to delete this person
          {' '}
          {person.name}
          ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClosePopUp} color="primary">
            No
          </Button>
          <Button onClick={() => handleDelete(person.uuid)} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeletePersonModal;
