import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CustomBage from '../CustomBadge/CustomBadge.jsx';
import { findUser } from '../../Redux/Actions/UsersActions/UserActions';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginRight: 20,
    marginBottom: 20,
    background: '#fff',
    borderRadius: 2,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    },
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  },
  roleBadge: {
    marginLeft: '10px',
  },
  name: {
    fontSize: '18px',
    fontWeight: '800',
  },
  email: {
    fontSize: '12px',
  },
  bage: {
    marginRight: 0,
  },
});

const UserCard = ({
  imgUrl, userName, userEmail, userId, userPosition,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(findUser(userId));
    history.push(`/users/${userId}`);
  }

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={userName}
          height="240"
          image={imgUrl}
          title={userName}
        />
        <CardContent>
          <div className={classes.row}>
            <div className={classes.name}>
              {userName}
            </div>
            <div className={classes.roleBadge}>
              <CustomBage
                text={userPosition}
                size="medium"
                position={userPosition}
                className={classes.bage}
              />
            </div>
          </div>
          <div className={classes.email}>
            {userEmail}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

UserCard.propTypes = {
  imgUrl: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  userId: PropTypes.string,
  userPosition: PropTypes.string,
};
UserCard.defaultProps = {
  imgUrl: 'https://themicon.co/theme/centric/v2.0/static-html5/src/images/04.jpg',
};

export default UserCard;
