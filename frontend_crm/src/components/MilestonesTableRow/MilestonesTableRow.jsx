import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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
    if (name === 'User') {
      history.push(`/user/${milestone.user_uuid}`);
    } else if (name === 'Name') {
      history.push(`/customers/${milestone.project_uuid}`);
    }
  }

  // if (visibeCells.includes('Participant')) {
  //   console.log(milestone);
  //   return (
  //     <></>
  //   );
  // }

  return (
    <StyledTableRow key={Math.random()}>
      {
                milestonesTableCells.map((cell) => {
                  console.log('ia debil');
                  const milestoneClassName = clsx({
                    [classes.redirect]: (cell.label === 'Name' || cell.label === 'User'),
                  });
                  if (visibeCells.includes(cell.label)) {
                    // console.log(milestone[cell.value]);
                    return (
                      <StyledTableCell
                        key={Math.random()}
                        align="center"
                        className={milestoneClassName}
                        onClick={() => handleClick(cell.label, milestone)}
                      >
                        {cell.label !== 'Participants'
                          ? milestone[cell.value] : milestone[cell.value].map((item) => (
                            <div key={Math.random()}>
                              <Typography style={{ paddingTop: 5, fontSize: '14px', whiteSpace: 'nowrap' }} key={Math.random()}>
                                {`${item.user} - ${item.role}`}
                              </Typography>
                              <Divider />
                            </div>
                          ))}
                      </StyledTableCell>
                    );
                  }
                  { /* if (visibeCells.includes(cell.label) && cell.label === 'Participants') {
                    if (milestone[cell.value].length !== 0) {
                      // console.log(milestone[cell.value]);

                      return (
                        <StyledTableCell
                          key={Math.random()}
                          align="center"
                          className={milestoneClassName}
                          onClick={() => handleClick(cell.label, milestone)}
                        >
                          <div key={Math.random()}>
                            <Typography style={{ paddingTop: 5, fontSize: '14px', whiteSpace: 'nowrap' }} key={Math.random()}>
                              {`${milestone.user} - ${milestone.role}`}
                            </Typography>
                            <Divider />
                          </div>

                          { milestone[cell.value].map((item) => (
                            <div key={Math.random()}>
                              <Typography style={{ paddingTop: 5, fontSize: '14px', whiteSpace: 'nowrap' }} key={Math.random()}>

                              </Typography>
                              <Divider />
                            </div>
                          ))}
                        </StyledTableCell>
                      );
                    }
                    return (
                      <StyledTableCell
                        key={Math.random()}
                        align="center"
                        className={milestoneClassName}
                        onClick={() => handleClick(cell.label, milestone)}

                      >
                        <div key={Math.random()}>
                          <Typography style={{ paddingTop: 5, fontSize: '14px', whiteSpace: 'nowrap' }} key={Math.random()}>
                            {`${milestone.user} - ${milestone.role}`}
                          </Typography>

                        </div>
                      </StyledTableCell>
                    );
                  } */ }
                  return false;
                })
          }
    </StyledTableRow>
  );
};

export default MilestonesTableRow;
