import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { fi } from 'date-fns/locale';
import UsersCards from './UsersCards.jsx';
import Loading from '../../components/Loading/index.jsx';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';
import { getProjects } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import getFilteredUsers from '../../Redux/Selectors/UserSelectors';
import FilterPanel from '../../components/FilterUserPanel/FilterUserPanel.jsx';
import UsersList from './UsersList.jsx';

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
    // maxWidth: '1370px',
    justifyContent: 'space-between',
    display: 'flex',
    margin: '0',
    marginRight: '20px',
    marginTop: 70,
  },
  h1: {
    fontSize: '40px',
  },
  button: {
    fontSize: '13 px',
    minHeight: '40px',
    padding: '0 10px',
  },
});

function Users() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => getFilteredUsers(state));
  const loading = useSelector((state) => state.users.loadingUsers);
  const [widgetView, setWidgetView] = useState(JSON.parse(localStorage.getItem('userWidgetView')) || false);
  const [filter, setFilter] = useState();
  // console.log(users);
  // const filter = 'developer';

  useEffect(() => {
    dispatch(getUsers(filter));
    dispatch(getProjects());
  }, [dispatch, filter]);
  // console.log('filter', filter);
  const handleChange = (event) => {
    setWidgetView(!widgetView);
    localStorage.setItem('userWidgetView', !widgetView);
  };
  return (
    <div className={classes.container}>
      <div className={classes.usersHeader}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h1>Users</h1>
          <FormControlLabel
            style={{ marginLeft: '10px' }}
            control={<Switch checked={widgetView} onChange={handleChange} color='primary' />}
            label="Widget view"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => history.push('/users/inviteuser')}
        >
          Invite user
        </Button>
      </div>
      {/* <FilterPanel /> */}
      <Grid container style={{ marginBottom: 15 }} spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => {
              setFilter({ filter: 'Developers' });
              dispatch(getUsers(filter));
            }}
          >
            Developers
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => {
              setFilter({ filter: 'manager' });
              dispatch(getUsers(filter));
            }}
          >
            Managers
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => {
              setFilter({ filter: '' });
              dispatch(getUsers(filter));
            }}
          >
            All
          </Button>
        </Grid>
      </Grid>
      <Grid
        className={classes.usersWrapper}
        container
        spacing={0}
        justify="flex-start"
      >
        {loading ? <Loading />
          : widgetView ? <UsersCards users={users} />
            : <UsersList users={users} />}

      </Grid>
    </div>
  );
}

export default Users;
