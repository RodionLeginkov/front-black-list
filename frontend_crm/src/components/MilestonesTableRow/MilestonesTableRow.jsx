import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { milestonesTableCells } from '../../constants/constants';

const useStyles = makeStyles({
  redirect: {
    cursor: 'pointer',
  },
});

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
  const classes = useStyles();
  const history = useHistory();
  const { visibeCells, milestone } = props;
  function handleClick(name, milestone) {
    // console.log(name, milestone.user_uuid, '|', milestone.project_uuid);
    if (name === 'User') {
      history.push(`/user/${milestone.user_uuid}`);
    } else if (name === 'Name') {
      history.push(`/customers/${milestone.project_uuid}`);
    }
  }


  return (
    <StyledTableRow key={Math.random()}>
      {
                milestonesTableCells.map((cell) => {
                  const milestoneClassName = clsx({
                    [classes.redirect]: (cell.label === 'Name' || cell.label === 'User'),
                  });
                  if (visibeCells.includes(cell.label)) {
                    return (
                      <StyledTableCell
                        key={Math.random()}
                        align="center"
                        className={milestoneClassName}
                        onClick={() => handleClick(cell.label, milestone)}
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
