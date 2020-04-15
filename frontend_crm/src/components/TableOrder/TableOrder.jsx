import React from 'react';
import ArrowDownwardSharpIcon from '@material-ui/icons/ArrowDownwardSharp';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpwardSharpIcon from '@material-ui/icons/ArrowUpwardSharp';
import IconButton from '@material-ui/core/IconButton';
import '../../Pages/UsersPage/UsersPage.css';

const useStyles = makeStyles(() => ({
//   orderButton: {
//     visibility: 'hidden',
//     '&:focus': {
//       visibility: 'visible',
//     },
//   },
}));

function TableOrder(props) {
  const {
    order, setOrder, cell, sort,
  } = props;

  console.log('cell', cell);
  console.log('sort', sort);
  const classes = useStyles();
  return (
    <>
      { (cell === sort)
        ? (order
          ? (
            <IconButton
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
