import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderBg from '../../Assets/headerBg.jpg';

const useStyles = makeStyles(() => ({

  homeTopSection: {
    background: `url(${HeaderBg}) center /cover no-repeat`,
    minHeight: '90vh',
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.homeTopSection} >
        ahjwbr
      </div>
      {/* <Grid
        className={classes.usersWrapper}
        container
        spacing={3}
        justify="center"
      /> */}
    </>
  );
}

export default Home;
