import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import UsersCards from './UsersCards.jsx';
import Loading from '../../components/Loading/index.jsx';
import getFilteredUsers from '../../Redux/Selectors/UserSelectors';
import UsersList from './UsersList.jsx';
import UsersFilter from './UsersFilter.jsx';

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
    width: '140px',
    fontSize: '13 px',
    minHeight: '40px',
    padding: '0 10px',
  },
});

function Users() {
  const classes = useStyles();

  const history = useHistory();
  const users = useSelector((state) => getFilteredUsers(state));
  const loading = useSelector((state) => state.users.loadingUsers);
  const [widgetView, setWidgetView] = useState(JSON.parse(localStorage.getItem('userWidgetView')) || false);
  // useEffect(() => {
  //   dispatch(getUsers(filterRole,filterBar,sort));
  //   //dispatch(getProjects());
  //   // eslint-disable-next-line
  // }, [dispatch,filterRole,filterBar,sort]);
  const handleChange = () => {
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
          Add user
        </Button>
      </div>

      <UsersFilter />
      {/* <Pagination count={10} color="primary" /> */}
      <Grid
        className={classes.usersWrapper}
        container
        spacing={0}
        justify="flex-start"
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {loading ? <Loading />
          : widgetView ? <UsersCards users={users} />
            : <UsersList users={users} />}

      </Grid>
    </div>
  );
}

export default Users;
