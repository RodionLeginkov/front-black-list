import React, { useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import SingleUserMilestoneCard from '../SingleUserMilestoneCard/SingleUserMilestoneCard.jsx';
import MilestonesTableOnSinglePages from '../MilestonesTableOnSinglePages/MilestonesTableOnSinglePages.jsx';

function UserMilestoneList(props) {
  const {
    user,
    milestones,
    showInfo,
    archived,
  } = props;
  // console.log(user);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [widgetView, setWidgetView] = useState(true);

  const choosenMilestones = milestones.filter((milestone) => (archived ? milestone.status === 'Archived' : milestone.status !== 'Archived'));
  const milestonesCard = widgetView ? choosenMilestones.map((milestone) => (
    <SingleUserMilestoneCard
      showInfo={showInfo}
      addUserModalOpen={addUserModalOpen}
      setAddUserModalOpen={setAddUserModalOpen}
      key={Math.random()}
      milestone={milestone}
      user={user}
    />
  )) : <MilestonesTableOnSinglePages milestones={milestones} archived={archived} />;


  const handleChangeView = () => {
    setWidgetView(!widgetView);
  };
  console.log(choosenMilestones)
  if (!choosenMilestones.length) return <Typography>There is no resourses</Typography>;
  return (
    <>

      <FormControlLabel
        style={{ marginLeft: '10px' }}
        control={<Switch checked={widgetView} onChange={handleChangeView} color='primary' />}
        label="Widget view"
      />
      <Grid container spacing={1} style={{ alignItems: 'center', marginTop: '5px', width: '100%' }}>
        {milestonesCard}
      </Grid>
    </>

  );
}

export default UserMilestoneList;
