import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import StackIcon from '../StackIcon/StackIcon.jsx';
import CustomBage from '../CustomBadge/CustomBadge.jsx';
import CustomProjectIcon from '../CustomProjectIcon/CustomProjectIcon.jsx';
import { findUser } from '../../Redux/Actions/UsersActions/UserActions';
import AddProjectModal from '../AddProjectModal/AddProjectModal.jsx';
import { stackList, userRoles } from '../../constants/constants';


const useStyles = makeStyles({
  root: {
    width: '100%',
    marginRight: 20,
    marginBottom: 20,
    background: '#fff',
    color: '#555',
    borderRadius: 2,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: '4px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 15px 10px 15px',
    cursor: 'default',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    backgroundSize: 'cover !important',
    zIndex: 1,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
  roleBadge: {
    position: 'absolute',
    top: 15,
    left: 0,
    marginLeft: '10px',
    zIndex: 2,
  },
  name: {
    fontSize: '20px',
    fontWeight: '800',
    marginTop: 10,
    zIndex: 2,
  },
  email: {
    fontSize: '12px',
    marginTop: 10,
    marginLeft: 10,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  badge: {
    marginRight: 0,
  },
  divider: {
    width: '100%',
    height: 117,
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    background: 'rgba(0, 0, 0, 0.02)',
    zIndex: 0,
  },
  stack: {
    display: 'flex',
  },
});


function difDates(startDate, curDate) {
  const
    difMonth = curDate.getMonth() - startDate.getMonth();
  const difYear = curDate.getFullYear() - startDate.getFullYear();
  const difDay = curDate.getDate() - startDate.getDate();
  if (difYear * 12 + difMonth > 12 && difMonth > 0) {
    return `${difYear} year(s) ${difMonth} month(s)`;
  }
  if (difYear * 12 + difMonth > 12 && difMonth < 0) {
    return `${difYear - 1} year(s) ${12 + difMonth} month(s)`;
  }
  if (difYear * 12 + difMonth > 0 && difMonth > 0) {
    return `${difMonth} month(s)`;
  }
  if (difYear * 12 + difMonth > 0 && difMonth < 0) {
    return `${12 + difMonth} month(s)`;
  }

  return `${difDay} day(s)`;
}


const UserCard = ({ user }) => {
  const classes = useStyles();
  const [isShowingModal, setIsShowingModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();


  const handleClickCard = () => {
    dispatch(findUser(user.uuid));
    history.push(`/user/${user.uuid}`);
  };


  const changeIsShowingModal = () => {
    setIsShowingModal(!isShowingModal);
  };

  const userStack = user.Skills.map((element) => {
    if (stackList.includes(element.name)) {
      return <StackIcon key={Math.random()} tech={element.name} size='medium' />;
    }
  });

  const defaultIcon = 'https://themicon.co/theme/centric/v2.0/static-html5/src/images/04.jpg';

  const startDate = new Date(user.hiredAt);
  const curDate = new Date();
  const role = userRoles.find((item) => item.value === user.role).label;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent onClick={handleClickCard}>
          <div className={classes.divider} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <div className={classes.roleBadge}> */}
            <CustomBage
              text={role}
              size="medium"
              position={user.role}
              currentProject
            />
            {/* </div> */}
            {user.hiredAt ? (
              <CustomBage
                text={difDates(startDate, curDate)}
                size="medium"
                position={user.role}
                className={classes.badge}
              />
            ) : ''}
          </div>
          <div className={classes.row}>
            <div
              className={classes.avatar}
              style={{ background: `url(${user.userImage || defaultIcon}) no-repeat` }}
            />
          </div>
          <div className={classes.row}>
            <div className={classes.name}>
              {user.firstName}
              {' '}
              {user.lastName}
            </div>
          </div>
        </CardContent>
        <div className={classes.footer}>
          <div className={classes.stack}>{userStack}</div>
          <CustomProjectIcon
            milestones={user.Users_Milestones}
            addProject={changeIsShowingModal}
            edit
          />
        </div>
      </CardActionArea>
      <AddProjectModal
        isOpen={isShowingModal}
        changeIsOpen={changeIsShowingModal}
        currentProjectIds={user.currentProject || []}
        user={user}
      />
    </Card>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
