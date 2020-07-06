/* eslint-disable no-nested-ternary */
import React from 'react';
import ArrowDownwardSharpIcon from '@material-ui/icons/ArrowDownwardSharp';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpwardSharpIcon from '@material-ui/icons/ArrowUpwardSharp';
import '../../Pages/UsersPage/UsersPage.css';

const useStyles = makeStyles(() => ({
  button: {
    padding: '0px 0px',
    marginLeft: '8px',
    marginBottom: '-8px',
  },
}));

function TableOrder(props) {
  const {
    order, cell, sort,
  } = props;

  const classes = useStyles();
  return (
    <>
      { (cell === sort && cell !== '')
        ? (order
          ? (
            <ArrowUpwardSharpIcon
              className={classes.button}
              variant="contained"
              color="inherit"
              size="medium"
            />
          ) : (
            <ArrowDownwardSharpIcon
              className={classes.button}
              variant="contained"
              color="inherit"
              size="medium"
            />
          )
        ) : false}

    </>
  );
}


export default TableOrder;
