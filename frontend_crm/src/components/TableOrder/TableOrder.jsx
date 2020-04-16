/* eslint-disable no-nested-ternary */
import React from 'react';
import ArrowDownwardSharpIcon from '@material-ui/icons/ArrowDownwardSharp';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpwardSharpIcon from '@material-ui/icons/ArrowUpwardSharp';
import IconButton from '@material-ui/core/IconButton';
import '../../Pages/UsersPage/UsersPage.css';

const useStyles = makeStyles(() => ({
  button:{
    padding: '0px 0px',
    marginLeft: '6px',
  },
}));

function TableOrder(props) {
  const {
    order, setOrder, cell, sort,
  } = props;

  const classes = useStyles();
  return (
    <>
      { (cell === sort)
        ? (order
          ? (
            <IconButton
              className={classes.button}
              variant="contained"
              color="inherit"
              size="medium"
              onClick={() => {
                setOrder(!order);
              }}
            >
              <ArrowUpwardSharpIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.button}
              variant="contained"
              color="inherit"
              size="medium"
              onClick={() => {
                setOrder(!order);
              }}
            >
              <ArrowDownwardSharpIcon />
            </IconButton>
          )
        ) : false}

    </>
  );
}

export default TableOrder;
