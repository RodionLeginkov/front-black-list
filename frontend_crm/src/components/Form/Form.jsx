import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Form({ userInfo }) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Input placeholder={userInfo} defaultValue="" inputProps={{ 'aria-label': 'description' }} />
    </form>
  );
}
