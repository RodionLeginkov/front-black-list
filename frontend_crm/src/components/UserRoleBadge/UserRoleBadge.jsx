import React from 'react';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  badge: {
    padding: '2px 4px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#fff',
  },
  user: {
    backgroundColor: yellow[800],
  },
  admin: {
    backgroundColor: green[500],
  },
  tiny: {
    padding: '1px 2px',
  },
  small: {
    padding: '3px 6px',
  },
  medium: {
    padding: '4px 8px',
  },
  large: {
    padding: '5px 10px',
  },
}));


export default function UserRoleBadge(props) {
  const classes = useStyles();
  const {
     text, size = 'tiny', isAdmin, className,
  } = props;

  const badgeClassName = clsx(classes.badge, {
    [classes.admin]: isAdmin === true,
    [classes.user]: isAdmin === false,
    [classes.medium]: size === 'medium',
    [classes.large]: size === 'large',
    [classes.small]: size === 'small',
  }, className);


  return (
    <span className={badgeClassName}>
      {text}
    </span>
  );
}
