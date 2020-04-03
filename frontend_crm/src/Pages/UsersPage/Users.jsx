import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
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
  const allUsers = useSelector((state) => state.users.length);
  // const TEST = useSelector((state) => state.users);
  const users = useSelector((state) => getFilteredUsers(state));
  const loading = useSelector((state) => state.users.loadingUsers);
  const [widgetView, setWidgetView] = useState(JSON.parse(localStorage.getItem('userWidgetView')) || false);
  const [filter, setFilter] = useState();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [pageCount, setPageCount] = useState((Math.ceil(allUsers / pageSize)));
  // console.log('test', TEST);

  // console.log(users);
  // const filter = 'developer';
  // setPage(10);

  useEffect(() => {
    dispatch(getUsers(filter, page, pageSize));
    dispatch(getProjects());
    // console.log(pageCount);
  }, [dispatch, filter, page]);

  // else if (allUsers > pageSize) ;
  // console.log('filter', filter);

  const handleChange = (event) => {
    setWidgetView(!widgetView);
    localStorage.setItem('userWidgetView', !widgetView);
  };
  // setPageCount((Math.ceil(allUsers / pageSize)));
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
              setFilter('Developers');
              dispatch(getUsers(filter, page, pageSize));
              setPageCount((Math.ceil(allUsers / pageSize)));
              // setPage(0);
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
              setFilter('manager');
              dispatch(getUsers(filter, page, pageSize));
              setPageCount((Math.ceil(allUsers / pageSize)));
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
              setFilter('');
              dispatch(getUsers(filter, page, pageSize));
              setPageCount((Math.ceil(allUsers / pageSize)));
            }}
          >
            All
          </Button>
        </Grid>
      </Grid>
      <Pagination
        count={pageCount}
        color="primary"
        onChange={(event, page) => {
          dispatch(getUsers(filter, page - 1, pageSize));
        }}
      />
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
