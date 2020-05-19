import React, { useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import AddNewMilestoneModal from '../AddNewMilestoneModal/AddNewMilestoneModal.jsx';
import SingleMilestoneCard from '../SingleMilestoneCard/SingleMilestoneCard.jsx';
import MilestonesTableOnSinglePages from '../MilestonesTableOnSinglePages/MilestonesTableOnSinglePages.jsx';


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
  const [widgetView, setWidgetView] = useState(true);

  const handleClick = () => {
    setAddUserModalOpen(true);
  };
  const choosenMilestones = projectMilestones.filter((milestone) => (archived ? milestone.status === 'Archived' : milestone.status !== 'Archived'));
  const milestones = widgetView ? choosenMilestones.map((milestone) => (
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
  )) : <MilestonesTableOnSinglePages project={project} projectPage milestones={projectMilestones} archived={archived} />;

  const handleChangeView = () => {
    setWidgetView(!widgetView);
  };
  if (!choosenMilestones.length) return <Typography>There is no resourses</Typography>;
  return (
    <>
      <FormControlLabel
        style={{ marginLeft: '10px' }}
        control={<Switch checked={widgetView} onChange={handleChangeView} color='primary' />}
        label="Widget view"
      />

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
