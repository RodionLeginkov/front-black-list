import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    top: '200px',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    marginTop: '10px',
    fontSize: '16px',
  },
}))

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
      <div className={classes.text}>Loading...</div>
    </div>
  );
}