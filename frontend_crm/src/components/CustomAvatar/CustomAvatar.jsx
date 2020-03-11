import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const useStyles = makeStyles(theme => ({
  avatarGroup: { 
    padding: '5px',
  }
}));

export default function CustomAvatar(props) {
  
  const classes = useStyles();
  const { users } = props;
  
  const devList = users.map((elem) => 
  (<Avatar key={Math.random()} alt={elem} src={`${elem.userImage}`}></Avatar> 
  ));

  return ( 
    <>
    <AvatarGroup className={classes.avatarGroup}>
      {devList}
      </AvatarGroup>
    </>)
}