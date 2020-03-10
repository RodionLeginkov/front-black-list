import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import HomeUsersList from './UserList';
import Loading from '../../components/Loading';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';
import FilterPanel from '../../components/FilterPanel';

const useStyles = makeStyles({
  container: {
    marginLeft: '100px',
  },
  usersWrapper: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    justifyContent: 'flex-start',
  },
  usersHeader: {
    alignItems: 'center',
    maxWidth: '1370px',
    justifyContent: 'space-between',
    display: 'flex',
    margin: '0 auto',
    marginTop: '70px',
    marginRight: '20px',
  },
  h1: {
    fontSize: '40px',
    marginLeft: '20px',
  },
});

function Home() {
  const classes = useStyles();
  const [isShowingFilterPanel, setIsShowingFilterPanel] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.filteredUsers);
  const loading = useSelector((state) => state.users.loadingUser);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const toggleShowingFilterPanel = () => {
    setIsShowingFilterPanel(!isShowingFilterPanel);
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className={classes.container}>
      <FilterPanel />
      <div className={classes.usersHeader}>
        <h1 className={classes.h1}>Developers</h1>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={toggleShowingFilterPanel}
        >
          Filters
        </Button>
      </div>
      <Grid
        className={classes.usersWrapper}
        container
        spacing={5}
        justify="center"
      >
        <HomeUsersList users={users} />
      </Grid>
    </div>
  );
}

export default Home;
