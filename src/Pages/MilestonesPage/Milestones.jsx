import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import MilestonesList from './MilestonesList.jsx';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(3),
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
}));
export default function StickyHeadTable() {
  const classes = useStyles();
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState(true);
  const [milestones, setMilestones] = useState([]);
  const [visibeCells, setVisibeCells] = useState([
    'Name',
    'User',
    'Person',
    'Participants',
    'Rate',
    'RPD',
    'Load',
    'Withdraw',
    'Platform',
    'Comment',
    'Start Date',
  ]);

  useEffect(() => {
    const getResponse = async () => {
      const response = await axios.get('/milestones', {
        params: {
          sort, order,
        },
      });
      const projectsResponse = response.data;
      setMilestones(projectsResponse);
    };
    getResponse();
  }, [sort, order]);
  return (
    <div className={classes.container}>
      <div className={classes.projectsHeader} style={{ justifyContent: 'start' }}>
        <h1>Projects</h1>
        {milestones && (
        <h3 style={{ marginTop: 22, marginLeft: 30 }}>
          Projects count `{milestones.length}
        </h3>
        )}
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
          sort={sort}
          setSort={setSort}
          order={order}
          setOrder={setOrder}
        />
      </Grid>
    </div>
  );
}
