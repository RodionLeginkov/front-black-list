import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import Loading from '../../components/Loading/index.jsx';
import { getUser } from '../../Redux/Actions/UsersActions/UserActions';

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: '0 100px',
  },
  paper: {
    margin: '0 auto',
    width: '900px',
    marginTop: '100px',
    display: 'flex',
    padding: '0 20px 0 0',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minWidth: '150px',
    borderRight: '1px solid grey',
    padding: '16px',
  },
  row: {
    display: 'flex',
    justifyContent: 'row',
  },
  name: {
    fontSize: '28px',
    margin: '10px 0',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    fontSize: '28px',
    padding: '16px',
    fontWeight: '800',
    width: '100%',
  },
  body: {
    fontSize: '16px',
    padding: '16px',
    fontWeight: '400',
    width: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '8px',
  },
  label: {
    marginRight: '8px',
  },
  field: {
    color: 'grey',
  },
  button: {
    fontSize: '13 px',
    height: '40px',
    padding: '0 10px',
  },
}));


function UserInfo({ match }) {
  const history = useHistory();
  const classes = useStyles();
  function handleClickOnBack() {
    history.push('/users');
  }

  const { userId } = match.params;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    if (!user)
      dispatch(getUser(userId));
  }, [dispatch, userId, user]);

  if (!user) return (<Loading />)

  const imgUrl = "https://themicon.co/theme/centric/v2.0/static-html5/src/images/04.jpg";

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.leftCol}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="240"
            image={imgUrl}
            title="Contemplative Reptile"
          />
          <div className={classes.row}>
            <div className={classes.name}>{user.login}</div>
          </div>
          <Button
            onClick={handleClickOnBack}
            variant="contained"
            size="large"
          >
            Go back
          </Button>
        </div>
        <Divider orientation="vertical" />
        <div className={classes.col}>
          <div className={classes.header}>Information</div>
          <div className={classes.body}>
            <div className={classes.item}>
              <div className={classes.label}>Email:</div>
              <span className={classes.field}>{user.email}</span>
            </div>
            <div className={classes.item}>
              <div className={classes.label}>Phone number:</div>
              <span className={classes.field}>{user.phoneNumber}</span>
            </div>
            <div className={classes.item}>
              <div className={classes.label}>Skype:</div>
              <span className={classes.field}>{user.skype}</span>
            </div>
            <div className={classes.item}>
              <div className={classes.label}>github:</div>
              <span className={classes.field}>{user.github}</span>
            </div>
          </div>
        </div>
      </Paper>
    </div >
  );
}
export default UserInfo;
