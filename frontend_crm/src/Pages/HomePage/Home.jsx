import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderBg from '../../Assets/headerBg.jpg';
import grayBG from '../../Assets/grayBG.jpg';
// background: `url(${grayBG}) center /cover no-repeat`,
const useStyles = makeStyles(() => ({

  homeTopSection: {
    background: `url(${grayBG}) center /cover no-repeat`,
    minHeight: '100vh',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    color: 'white',
    fontSize: '4rem',
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.homeTopSection}>
        <h1 style={{ marginTop: '200px' }}>Exceed Team</h1>
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
