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
  const { order, isSelected } = props;

  const classes = useStyles();
  return (
    <>
      <IconButton className="orderButton">
        <ArrowDownwardSharpIcon />
      </IconButton>
    </>
  );
}

export default TableOrder;
