import React, { useState } from 'react';
import 'date-fns';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import TableRow from '@material-ui/core/TableRow';
import AddPersonModal from '../AddPersonModal/AddPersonModal.jsx';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

const PersonListItem = (props) => {
  const {
    projectId,
    person,
    personDelete,
    personChange,
    isEdit,
    newProjectId,
    curProject,
  } = props;
  const dispatch = useDispatch();
  const [personModalOpen, setPersonModalOpen] = useState(false);
  const handleDelete = async (id) => {
    if (projectId) {
      await axios.put(`/project/${curProject.uuid}`, { ...curProject, workStart: curProject.workStart || new Date('2020-06-03 05:00:32.945000 +00:00'), curProject: curProject.workEnd || new Date('2020-06-03 15:00:32.952000 +00:00') });
      await axios.delete(`/person/${id}`);
      dispatch(getProject(projectId));
    } else {
      personDelete(person);
    }
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#32418C',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  return (
    <>
      <StyledTableRow key={person.name}>
        <StyledTableCell align="center" component="th" scope="row">
          {person.name}
        </StyledTableCell>
        <StyledTableCell align="center">{person.description}</StyledTableCell>
        <StyledTableCell align="center">
          {personDelete
            ? (
              <>
                <IconButton onClick={() => setPersonModalOpen(true)}>
                  <CreateSharpIcon />
                </IconButton>

                <IconButton onClick={() => handleDelete(person.uuid)}>
                  <DeleteSharpIcon />
                </IconButton>
              </>
            ) : ''}

        </StyledTableCell>
      </StyledTableRow>
      <AddPersonModal
        setPersonModalOpen={setPersonModalOpen}
        personModalOpen={personModalOpen}
        projectId={projectId}
        initialPerson={person}
        personChange={personChange}
        isEdit={isEdit}
        newProjectId={newProjectId}
        curProject={curProject}
      />
      {/* <Grid item sm={3}>
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
      /> */}
    </>

  );
};

export default PersonListItem;
