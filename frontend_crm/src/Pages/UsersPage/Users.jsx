import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import UsersCards from './UsersCards.jsx';
import Loading from '../../components/Loading/index.jsx';
import getFilteredUsers from '../../Redux/Selectors/UserSelectors';
import UsersList from './UsersList.jsx';
import UsersFilter from './UsersFilter.jsx';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';


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
  let users = useSelector((state) => getFilteredUsers(state));
  const loading = useSelector((state) => state.users.loadingUsers);
  const [widgetView, setWidgetView] = useState(JSON.parse(localStorage.getItem('userWidgetView')) || false);
  const [filterRole, setFilterRole] = useState('');
  const [filterBar, setFilterBar] = useState('');
  const [sort, setSort] = useState('');
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(true);
  const [profitable, setProfitable] = useState('');
  const [visibeCells, setVisibeCells] = useState([
    'Name',
    'Current Task',
    'Current project',
    'Role in the project',
    'Current rate',
    'Load(h/week)',
    'Role',
    'Project Ready',
    'Seniority',
    'Total Load',
    'English Skill',
  ]);
  const [selectButton, setSelectButton] = useState('');
  const [profitButton, setProfitButton] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(filterRole, filterBar, sort, order, profitable));
  }, [dispatch, filterRole, filterBar, sort, order, profitable]);

  const handleChange = () => {
    setWidgetView(!widgetView);
    localStorage.setItem('userWidgetView', !widgetView);
  };

  if (profitable === 'No Profitable') {
    users = users.filter((user) => user.Users_Milestones.length === 0 || !user.Users_Milestones.find((milestone) => milestone.rate !== 0)
    );
  }

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

      <UsersFilter
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        filterBar={filterBar}
        setFilterBar={setFilterBar}
        sort={sort}
        setSort={setSort}
        open={open}
        setOpen={setOpen}
        order={order}
        setOrder={setOrder}
        selectButton={selectButton}
        setSelectButton={setSelectButton}
        profitable={profitable}
        setProfitable={setProfitable}
        profitButton={profitButton}
        setProfitButton={setProfitButton}
      />
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
            : (
              <UsersList
                setVisibeCells={setVisibeCells}
                visibeCells={visibeCells}
                users={users}
                sort={sort}
                setSort={setSort}
                order={order}
                setOrder={setOrder}
              />
            )}

      </Grid>
    </div>
  );
}

export default Users;
