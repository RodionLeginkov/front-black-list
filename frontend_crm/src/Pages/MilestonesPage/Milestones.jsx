import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import MilestonesList from './MilestonesList.jsx';

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '13 px',
    minHeight: '40px',
    padding: '0 10px',
  },
  container: {
    paddingLeft: theme.spacing(3),
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
      <div className={classes.projectsHeader}>
        <h1>Projects</h1>
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
