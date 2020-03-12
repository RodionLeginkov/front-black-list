import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UsersList from './UsersList.jsx';
import Loading from '../../components/Loading/index.jsx';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';
import FilterPanel from '../../components/FilterUserPanel/FilterUserPanel.jsx';

const useStyles = makeStyles({
  container: {
    marginLeft: '100px',
  },
  usersWrapper: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0',
    justifyContent: 'flex-start',
  },
  usersHeader: {
    alignItems: 'center',
    maxWidth: '1370px',
    justifyContent: 'space-between',
    display: 'flex',
    margin: '0',
    marginRight: '20px',
    marginTop: 70,
  },
  h1: {
    fontSize: '40px',
  },
});

function Home() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.filteredUsers);
  const loading = useSelector((state) => state.users.loadingUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  return (
    <div className={classes.container}>
      <div className={classes.usersHeader}>
        <h1>Developers</h1>
      </div>
      <FilterPanel />
      <Grid
        className={classes.usersWrapper}
        container
        spacing={0}
        justify="center"
      >
        {loading ? <Loading /> : <UsersList users={users} />}

      </Grid>
    </div>
  );
}

export default Home;
