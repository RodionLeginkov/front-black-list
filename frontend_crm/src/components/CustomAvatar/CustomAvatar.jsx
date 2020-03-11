import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  avatarGroup: { 
    padding: '5px',
  }
}));

export default function CustomAvatar(props) {
  
  const classes = useStyles();
  const { users } = props;
  
  const  allUsers = useSelector((state) => state.users.users)

  const neededUsers = allUsers.filter((elem) => users.includes(elem.login))

  const devList = neededUsers.map((elem) => 
  (<Avatar key={Math.random()} alt={elem.login} src={`${elem.userImage}`}></Avatar> 
  ));

  return ( 
    <>
    <AvatarGroup className={classes.avatarGroup}>
      {devList}
      </AvatarGroup>
    </>)
}