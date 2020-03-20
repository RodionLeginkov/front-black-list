import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Loading from '../../components/Loading/index.jsx';
import CustomBadge from '../../components/CustomBadge/CustomBadge.jsx';
import StackIcon from '../../components/StackIcon/StackIcon.jsx';
import CustomProjectIcon from '../../components/CustomProjectIcon/CustomProjectIcon.jsx';
import { getUser, deleteUser } from '../../Redux/Actions/UsersActions/UserActions';
import PopUpDeleteUser from './PopUpDeleteUser.jsx';

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
    color: '#444',
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
    width: 160,
    height: 160,
    borderRadius: 120,
    backgroundSize: 'cover !important',
    margin: 20,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  fieldName: {
    display: 'block;',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  link: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
}));

const UserInfo = ({ match: { params: { userId }, path } }) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openPopUp, setOpenPopUp] = useState(false);

  const handleClickOpenPopUp = () => {
    setOpenPopUp(true);
  };

  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  const handleClickOnBack = () => {
    if (path === '/users/:userId') history.goBack();
    history.push('/users');
  };

  const handleClickOnDelete = () => {
    dispatch(deleteUser(userId));
    history.push('/users');
  };

  const handleClickOnEdit = () => {
    history.push(`/users/edituser/${userId}`);
  };

  const user = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    if (!user) dispatch(getUser(userId));
  }, [dispatch, userId, user]);

  if (!user) return (<Loading />);

  const imgUrl = user.userImage || 'https://themicon.co/theme/centric/v2.0/static-html5/src/images/04.jpg';

  const stackList = user.stack.map((element) => (
    <StackIcon key={Math.random()} tech={element} size='medium' />
  ));

  return (
    <div className={classes.container}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Typography className={classes.link} onClick={() => history.push('/users')}>
          Users
        </Typography>
        <Typography color="textPrimary" onClick={() => history.push(`/users/${user._id}`)}>{user.fullName}</Typography>
      </Breadcrumbs>
      <Paper className={classes.root}>
        <div className={clsx(classes.content, classes.header)}>
          <h1>{user.fullName || user.login}</h1>
          <div style={{ marginRight: '10px' }}>
            <CustomBadge text={user.status} position={user.status} size="large" />
          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div className={classes.leftCol}>
            <div className={classes.userImage} style={{ background: `url(${imgUrl}) no-repeat` }} />
            <span className={classes.fieldName}>
              {user.fullName}
            </span>
          </div>
          <div className={classes.col}>
            <div className={classes.body}>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Email: </span>
                <div className={classes.fieldValue}>
                  {user.email}
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Phone: </span>
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
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Projects: </span>
                <div className={classes.fieldValue}>
                  <CustomProjectIcon
                    projects={user.currentProject || []}
                    edit={false}
                  />
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>English level: </span>
                <div className={classes.fieldValue}>
                  {user.englishLevel}
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
            <EditSharpIcon onClick={handleClickOnEdit} />
          </Button>
          <Button onClick={handleClickOpenPopUp} className={classes.deleteButton}>
            <DeleteOutlineIcon />
          </Button>
        </div>
      </Paper>
      <PopUpDeleteUser
        handleClickOnDelete={handleClickOnDelete}
        handleClosePopUp={handleClosePopUp}
        openPopUp={openPopUp}
      />
    </div>
  );
};

UserInfo.propTypes = {
  match: PropTypes.object,
};
UserInfo.defaultProps = {
  match: {},
};

export default UserInfo;
