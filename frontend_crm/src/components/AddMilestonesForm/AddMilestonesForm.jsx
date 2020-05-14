import React, { useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import IconButton from '@material-ui/core/IconButton';
import AddNewMilestoneModal from '../AddNewMilestoneModal/AddNewMilestoneModal.jsx';
import SingleMilestoneCard from '../SingleMilestoneCard/SingleMilestoneCard.jsx';

function AddMilestonesForm(props) {
  const {
    forRead,
    setProject,
    showInfo,
    project,
    projectMilestones,
    milestonesChange,
    isEdit,
    setProjectMilestones,
    archived,
  } = props;
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const handleClick = () => {
    setAddUserModalOpen(true);
  };

  const milestones = projectMilestones.map((milestone) => {
    if (!archived && milestone.status !== 'Archived') {
      return (
        <SingleMilestoneCard
          showInfo={showInfo}
          addUserModalOpen={addUserModalOpen}
          setAddUserModalOpen={setAddUserModalOpen}
          key={Math.random()}
          milestone={milestone}
          isEdit={isEdit}
          project={project}
          setProject={setProject}
          projectMilestones={projectMilestones}
          setProjectMilestones={setProjectMilestones}
          archived={archived}
        />
      );
    }
    if (archived && milestone.status === 'Archived') {
      return (
        <SingleMilestoneCard
          showInfo={showInfo}
          addUserModalOpen={addUserModalOpen}
          setAddUserModalOpen={setAddUserModalOpen}
          key={Math.random()}
          milestone={milestone}
          isEdit={isEdit}
          project={project}
          setProject={setProject}
          projectMilestones={projectMilestones}
          setProjectMilestones={setProjectMilestones}
          archived={archived}
        />
      );
    }
  });


  return (
    <>
      <Grid container spacing={1} style={{ alignItems: 'center', marginTop: '5px' }}>

        {milestones}
        {isEdit && !archived
          ? (
            <Grid item xs={1}>
              <Tooltip title="Set user">
                <IconButton aria-label="delete" onClick={handleClick}>
                  <AddCircleOutlineSharpIcon style={{ fontSize: '30px' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : ''}
      </Grid>
      {isEdit ? (
        <AddNewMilestoneModal
          forRead={forRead}
          projectMilestones={projectMilestones}
          addUserModalOpen={addUserModalOpen}
          setAddUserModalOpen={setAddUserModalOpen}
          curProject={project}
          milestonesChange={milestonesChange}
        />
      )
        : ''}
    </>
  );
}

export default AddMilestonesForm;
