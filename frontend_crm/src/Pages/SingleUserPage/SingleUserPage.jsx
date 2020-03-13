import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Loading from '../../components/Loading/index.jsx';
import CustomBadge from '../../components/CustomBadge/CustomBadge.jsx';
import StackIcon from '../../components/StackIcon/StackIcon.jsx';
import { getUser, deleteUser } from '../../Redux/Actions/UsersActions/UserActions';

const useStyles = makeStyles(() => ({
  container: {
    margin: '100px 10px 0 85px',
  },
  footerIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    margin: '0 auto',
    maxWidth: '900px',
    marginTop: '30px',
  },
  content: {
    margin: '0px 20px',
    display: 'flex',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userImage: {
    maxWidth: 240,
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  body: {
    padding: '10px 10px 10px 20px',
  },
  fieldTitle: {
    display: 'block;',
    fontSize: 20,
    fontWeight: 'bold',
  },
  field: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldValue: {
    fontSize: 16,
    margin: '10px',
    display: 'flex',
  },
  stackAndDuration: {
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    margin: '4px 13px',
    paddingBottom: '10px',
  },
  duration: {
    margitTop: '3px  !important',
  },
  breadcrumbs: {
    margin: '85px 20px',
    color: '#777777',
  },
}));


function UserInfo({ match: { params: { userId } } }) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickOnBack = () => {
    history.push('/users');
  };

  const handleClickOnDelete = () => {
    dispatch(deleteUser(userId));
    history.push('/users');
  };

  const user = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    if (!user) dispatch(getUser(userId));
  }, [dispatch, userId, user]);

  if (!user) return (<Loading />);

  const imgUrl = user.userImage || 'https://themicon.co/theme/centric/v2.0/static-html5/src/images/04.jpg';

  const stackList = user.stack.map((element) => (
    <StackIcon key={Math.random()} tech={element} size='medium' /> // /////////////////////////////
  ));

  return (
    <div className={classes.container}>
      <h5 className={classes.breadcrumbs}>
        Developers/
        {user.name || user.login}
      </h5>
      <Paper className={classes.root}>
        <div className={clsx(classes.content, classes.header)}>
          <h1>{user.name || user.login}</h1>
          <div style={{ marginRight: '10px' }}>
            <CustomBadge text={user.status} position={user.status} size="large" />
          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div className={classes.col}>
            <div className={classes.userImage}>
              <CardMedia
                component="img"
                alt="User avatar"
                height="240"
                image={imgUrl}
                title="User avatar"
              />
            </div>
            <span className={classes.fieldTitle}>
              {user.name}
              {' '}
              {user.surname}
            </span>
          </div>
          <Divider orientation="vertical" />
          <div className={classes.col}>
            <div className={classes.body}>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Email: </span>
                <div className={classes.fieldValue}>
                  {user.email}
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Pfone: </span>
                <div className={classes.fieldValue}>
                  {user.phoneNumber}
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Stack: </span>
                <div className={classes.fieldValue}>
                  {stackList}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className={classes.footerIcons}>
          <Button onClick={handleClickOnBack}>
            <ArrowBackIosIcon />
          </Button>
          <Button>
            <EditSharpIcon />
          </Button>
          <Button onClick={handleClickOnDelete} className={classes.deleteButton}>
            <DeleteOutlineIcon />
          </Button>
        </div>
      </Paper>
    </div>
  );
}

UserInfo.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      userId: PropTypes.string,
    }),
  }),
};
UserInfo.defaultProps = {
  match: {},
};

export default UserInfo;
