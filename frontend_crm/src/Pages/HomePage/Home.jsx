import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HomeUsersList from './HomeUsersList.jsx';
import HeaderBg from '../../Assets/headerBg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  usersWrapper: {
    paddingTop: '100px',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    paddingBottom: '250px',
  },
  homeTopSection: {
    background: `url(${HeaderBg}) center /cover no-repeat`,
    minHeight: '90vh',
  },
}));

function Home() {
  const classes = useStyles();
  const [users] = useState([1, 2, 3]);
  return (
    <>
      <div className={classes.homeTopSection} />

      <Grid
        className={classes.usersWrapper}
        container
        spacing={3}
        justify="center"
      >
        <HomeUsersList users={users} />
      </Grid>
    </>
  );
}

export default Home;
