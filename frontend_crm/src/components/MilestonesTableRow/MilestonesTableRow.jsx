import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { milestonesTableCells } from '../../constants/constants';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#32418c',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


const MilestonesTableRow = (props) => {
  const { visibeCells, milestone } = props;
  return (
    <StyledTableRow key={Math.random()}>
      {
                milestonesTableCells.map((cell) => {
                  if (visibeCells.includes(cell.label)) {
                    return (
                      <StyledTableCell
                        key={Math.random()}
                        align="center"
                      >
                        {milestone[cell.value]}
                      </StyledTableCell>
                    );
                  }
                  return false;
                })
          }
    </StyledTableRow>
  );
};

export default MilestonesTableRow;
