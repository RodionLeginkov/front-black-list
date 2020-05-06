import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import AddPersonModal from '../AddPersonModal/AddPersonModal.jsx';
import AddUserModal from '../AddUserModal/AddUserModal.jsx';
import CustomBage from '../CustomBadge/CustomBadge.jsx';
import { paymentTypes } from '../../constants/constants';
import SingleMilestoneCard from '../SingleMilestoneCard/SingleMilestoneCard.jsx';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

const PersonListItem = (props) => {
  const {
    projectId,
    person,
    personDelete,
    personChange,
  } = props;
  const dispatch = useDispatch();
  const [personModalOpen, setPersonModalOpen] = useState(false);
  const handleDelete = async (id) => {
    if (projectId) {
      try {
        await axios.delete(`/person/${id}`);
        dispatch(getProject(projectId));
      } catch (error) {

      }
    } else {
      personDelete(person);
    }
  };

  return (
    <>
      <Grid item sm={3}>
        <TextField
          value={person.name}
          variant="outlined"
          id="standard-multiline-flexible"
          label="Name"
          style={{ width: '100%' }}
        //   name='customer'
          disabled
        />
      </Grid>
      <Grid item sm={7}>
        <TextField
          value={person.description}
          variant="outlined"
          style={{ width: '100%' }}
          id="standard-multiline-flexible"
          label="Description"
        //   name='customer'
          disabled
        />
      </Grid>
      <Grid item sm={1}>
        <IconButton onClick={() => setPersonModalOpen(true)}>
          <CreateSharpIcon />
        </IconButton>
      </Grid>
      <Grid item sm={1}>
        <IconButton onClick={() => handleDelete(person.uuid)}>
          <DeleteSharpIcon />
        </IconButton>
      </Grid>
      <AddPersonModal
        setPersonModalOpen={setPersonModalOpen}
        personModalOpen={personModalOpen}
        projectId={projectId}
        initialPerson={person}
        personChange={personChange}
      />
    </>

  );
};

export default PersonListItem;
