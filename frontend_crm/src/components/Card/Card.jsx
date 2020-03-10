import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import UserRoleBadge from '../UserRoleBadge/UserRoleBadge.jsx';
import { findUser } from '../../Redux/Actions/UsersActions/UserActions';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginRight: 20,
    marginBottom: 20,
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
});

export default function ImgMediaCard({ imgUrl, userName, userEmail, userId, userRole }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // const { imgUrl } = props;

  function handleClick() {
    dispatch(findUser(userId));
    history.push(`/users/${userId}`);
  }

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="240"
          image={imgUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <div className={classes.row}>
            <div className={classes.name}>
              {userName}
            </div>
            <div className={classes.roleBadge}>
              <UserRoleBadge
                text={userRole ? 'Admin' : 'User'}
                isAdmin={userRole}
                size={'medium'}
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
}
