import React, { useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import IconButton from '@material-ui/core/IconButton';
import AddNewMilestoneModal from '../AddNewMilestoneModal/AddNewMilestoneModal.jsx';
import SingleUserMilestoneCard from '../SingleUserMilestoneCard/SingleUserMilestoneCard.jsx';
import ArchivedMilestonesTable from '../ArchivedMilestonesTable/ArchivedMilestonesTable.jsx';

function UserMilestoneList(props) {
  const {
    user,
    milestones,
    showInfo,
    archived,
  } = props;
  // console.log(user);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const handleClick = () => {
    setAddUserModalOpen(true);
  };

  const milestonesCard = !archived ? milestones.map((milestone) => {
    if (milestone.status !== 'Archived') {
      return (
        <SingleUserMilestoneCard
          showInfo={showInfo}
          addUserModalOpen={addUserModalOpen}
          setAddUserModalOpen={setAddUserModalOpen}
          key={Math.random()}
          milestone={milestone}
          user={user}
        />
      );
    }
  }) : <ArchivedMilestonesTable milestones={milestones} archived={archived}/>;


  return (
    <>
      <Grid container spacing={1} style={{ alignItems: 'center', marginTop: '5px', width: '100%' }}>
        {milestonesCard}
      </Grid>
    </>

  );
}

export default UserMilestoneList;
