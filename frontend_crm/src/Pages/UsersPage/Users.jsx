import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HomeUsersList from './UserList';

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
    justifyContent: 'left',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    paddingBottom: '250px',
  },
  usersHeader: {
    maxWidth: '1350px',
    justifyContent: 'space-between',
    display: 'flex',
    margin: '0 auto',
    marginTop: '70px',
  },
  h1: {
    fontSize: '40px',
  },
}));

function Home() {
  const classes = useStyles();
  const [users] = useState([
    { name: 'NAME', info: 'INFO' },
    { name: 'NAme', info: 'INFO' },
    { name: 'NAmE', info: 'INFO' },
    { name: 'nAME', info: 'INFO' },
    { name: 'NAME', info: 'INFO' },
  ]);

  // function AddUser(num) {
  //   setUsers([...users, num]);
  //   // setUsers((prevState) => [...prevState, num])
  // }

  return (
    <>
      <div className={classes.usersHeader}>
        <h1 className={classes.h1}>Users</h1>
        {/* <SearchUserBar /> */}

        {/* There was a button for adding a new user. RIP */}
        {/* <NewUserButton AddUser={AddUser} /> */}
      </div>
      <Grid
        className={classes.usersWrapper}
        container
        spacing={5}
        justify="center"
      >
        <HomeUsersList users={users} />
      </Grid>
    </>
  );
}

export default Home;
