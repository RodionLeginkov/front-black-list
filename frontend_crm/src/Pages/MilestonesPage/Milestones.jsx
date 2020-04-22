import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import MilestonesList from './MilestonesList.jsx';

const useStyles = makeStyles({
  button: {
    fontSize: '13 px',
    minHeight: '40px',
    padding: '0 10px',
  },
  container: {
    paddingLeft: '100px',

  },
  tableWrapper: {
    width: '100%',
    margin: '0 auto',
  },
  projectsHeader: {
    alignItems: 'center',
    marginRight: '20px',
    justifyContent: 'space-between',
    display: 'flex',
    margin: '0',
    marginTop: 70,
  },
  h1: {
    fontSize: '40px',
  },
});
export default function StickyHeadTable() {
  const classes = useStyles();
  const [milestones, setMilestones] = useState([]);
  const [visibeCells, setVisibeCells] = useState([
    'Name',
    'User',
    'Participants',
    'Rate',
    'RPD',
    'Load',
    'Withdraw',
    'Platform',
    'Comments',
    'Start Date',
  ]);

  useEffect(() => {
    const getResponse = async () => {
      const response = await axios.get((`${process.env.REACT_APP_BASE_API}milestones`));
      const projectsResponse = response.data;
      setMilestones(projectsResponse);
    };
    getResponse();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.projectsHeader}>
        <h1>Leads</h1>
      </div>
      <Grid
        className={classes.usersWrapper}
        container
        spacing={0}
        justify="flex-start"
      >
        <MilestonesList
          milestones={milestones}
          visibeCells={visibeCells}
          setVisibeCells={setVisibeCells}
        />
      </Grid>
    </div>
  );
}
