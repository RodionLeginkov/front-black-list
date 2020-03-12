import React from 'react';
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

export default function ImgMediaCard({
  imgUrl, userName, userEmail, userId, userPosition,
}) {
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
          alt="Contemplative Reptile"
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
                text={userPosition || 'udefined'}
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
}
