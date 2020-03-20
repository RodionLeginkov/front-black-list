import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UsersList from './UsersList.jsx';
import Loading from '../../components/Loading/index.jsx';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';
import { getProjects } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import getFilteredUsers from '../../Redux/Selectors/UserSelectors';
import FilterPanel from '../../components/FilterUserPanel/FilterUserPanel.jsx';

const useStyles = makeStyles({
  container: {
    paddingLeft: '100px',
    background: '#fff',
  },
  usersWrapper: {
    width: '100%',
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

function Users() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const users = useSelector((state) => getFilteredUsers(state));
  const loading = useSelector((state) => state.users.loadingUsers);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProjects());
  }, [dispatch]);


  return (
    <div className={classes.container}>
      <div className={classes.usersHeader}>
        <h1>Users</h1>
      </div>
      <FilterPanel />
      <Grid
        className={classes.usersWrapper}
        container
        spacing={0}
        justify="flex-start"
      >
        {loading ? <Loading /> : <UsersList users={users} />}

      </Grid>
    </div>
  );
}

export default Users;
