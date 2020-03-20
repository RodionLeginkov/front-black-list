import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { findUser } from '../../Redux/Actions/UsersActions/UserActions'

import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
  
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function CustomList(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { users } = props;



  function handleClick(userId) {
    dispatch(findUser(userId));
    history.push(`/users/${userId}`);
  }


  const devList = users.map((user) =>

    <div key={user._id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Tooltip title={user.fullName}>
            <Avatar onClick={() => handleClick(user._id)} alt={user.fullName.toUpperCase()} src={`${user.userImage}`} />
          </Tooltip>
        </ListItemAvatar>
        <ListItemText
          primary={user.fullName}
          secondary={(
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {user.status}
              </Typography>
              {' — developer`s info'}
            </>
          )}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
  if (users.length > 0) {
    return (
      <div style={{ marginLeft: '20px', display: 'flex' }}>
        <h2>Developers:</h2>
        <List className={classes.root}>
          {devList}
        </List>
      </div>
    );
  }
  return (
    <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
      <h2>Developers:</h2>
      <Typography
        component="span"
        variant="body2"
        style={{ margin: '0px 10px', fontSize: '1rem' }}
        className={classes.inline}
        color="textPrimary"
      >
        There is no developers yet
      </Typography>
    </div>
  );
}