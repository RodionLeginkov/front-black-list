import React from 'react';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import blue from '@material-ui/core/colors/blue';
import brown from '@material-ui/core/colors/brown';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  badge: {
    padding: '2px 4px',
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#fff',
    marginRight: '10px',
  },
  active: {
    backgroundColor: yellow[800],
  },
  completed: {
    backgroundColor: green[500],
  },
  pending: {
    backgroundColor: brown[500],
  },
  onGoing: {
    backgroundColor: blue[500],
  },
  stopped: {
    backgroundColor: red[500],
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
  price: {
    color: '#000',
    backgroundColor: '#eee',
    height: '20px',
    fontSize: '15px',
    alignItems: 'center',
  },
  tech: {
    color: '#000',
  },
}));


export default function CustomBadge(props) {
  const classes = useStyles();
  const {
     text, size = 'tiny', theme, status, className,
  } = props;

  const badgeClassName = clsx(classes.badge, {
    [classes.price]: theme === 'price',
    [classes.active]: status === 'active',
    [classes.completed]: status === 'completed',
    [classes.stopped]: status === 'stopped',
    [classes.pending]: status === 'pending',
    [classes.onGoing]: status === 'onGoing',
    [classes.medium]: size === 'medium',
    [classes.large]: size === 'large',
    [classes.tech]: theme === 'tech',
  }, className);


  return (

    <span className={badgeClassName}>
      {text}
    </span>

  );
}
