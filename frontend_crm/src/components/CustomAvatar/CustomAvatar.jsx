import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import { deepOrange } from '@material-ui/core/colors';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import {findUser} from '../../Redux/Actions/UsersActions/UserActions'
const useStyles = makeStyles(theme => ({
  avatarGroup: { 
    padding: '5px',
  }
}));

export default function CustomAvatar(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { users } = props;
  const  allUsers = useSelector((state) => state.users.users)

  const neededUsers = allUsers.filter((elem) => users.includes(elem.login))

  function handleClick(userId) {
    console.log(userId)
    dispatch(findUser(userId));
    history.push(`/users/${userId}`);
  }

  const devList = neededUsers.map((elem) => 
    <Tooltip title={elem.login}>  
      <Avatar onClick={() => handleClick(elem._id)} key={elem._id} alt={elem.login} src={`${elem.userImage}`} />
    </Tooltip>
  );

  return ( 
    <>  
    <AvatarGroup className={classes.avatarGroup}>
      {devList}
      </AvatarGroup>
    </>)
}