import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import UserDashboard from '../../components/DashBoards/UsersDashboard';
import CongestionDashboard from '../../components/DashBoards/CongestionDashboard';
import homeBG from '../../Assets/homeBG.jpg';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';

const useStyles = makeStyles(() => ({

  homeTopSection: {
    background: `url(${homeBG}) center /cover no-repeat`,
    minHeight: '100vh',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    fontSize: '4rem',
    marginLeft: 0,
    padding: 0,
    flexDirection: 'column',
  },
}));

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers('', '', '', '', '', 'Active'));
  }, [dispatch]);

  const users = useSelector((state) => state.users.users);


  const classes = useStyles();
  return (
    <>
      <div className={classes.homeTopSection}>
        <h1 style={{ marginTop: '150px', marginBottom: '20px' }}> Exceed</h1>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginBottom: -70, marginTop: 20,
          }}
          >
            <h4 style={{ marginLeft: 450, color: 'black', fontWeight: '100' }}>Team</h4>
            <h4 style={{ marginRight: 370, color: 'black', fontWeight: '100' }}>Developers</h4>
          </div>
          <div style={{
            height: 400, display: 'flex',
          }}
          >
            <UserDashboard users={users} />
            <CongestionDashboard users={users} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
