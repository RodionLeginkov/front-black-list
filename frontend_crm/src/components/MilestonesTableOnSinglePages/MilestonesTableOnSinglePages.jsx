import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MilestonesTableRow from '../MilestonesTableRowOnSinglePages/MilestonesTableRowOnSinglePages.jsx';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
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


const MilestonesTableOnSinglePages = (props) => {
  const classes = useStyles();
  const {
    project, projectPage, milestones, archived,
  } = props;

  const rows = milestones.filter((milestone) => (archived ? milestone.status === 'Archived' : milestone.status !== 'Archived'));

  return (
    <>
      <TableContainer component={Paper} style={{ marginRight: 20 }}>
        <Table className={classes.table}>
          <TableHead color='primary'>
            {archived ? (
              <TableRow>

                <StyledTableCell align="center"> Project</StyledTableCell>
                <StyledTableCell align="center"> Role</StyledTableCell>
                <StyledTableCell align="center"> Load</StyledTableCell>
                <StyledTableCell align="center"> Start Date</StyledTableCell>
                <StyledTableCell align="center"> End Date</StyledTableCell>
                <StyledTableCell align="center"> Comment</StyledTableCell>
              </TableRow>
            ) : (
              <TableRow>

                <StyledTableCell align="center"> Project</StyledTableCell>
                <StyledTableCell align="center"> Role</StyledTableCell>
                <StyledTableCell align="center"> Load</StyledTableCell>
                <StyledTableCell align="center"> Person</StyledTableCell>
                <StyledTableCell align="center"> Start Date</StyledTableCell>
                <StyledTableCell align="center"> End Date</StyledTableCell>
                <StyledTableCell align="center"> Comment</StyledTableCell>
              </TableRow>
            )}

          </TableHead>
          {archived ? (
            <TableBody>
              {rows.map((item) => (
                <MilestonesTableRow
                  milestone={item}
                  key={Math.random()}
                  projectPage={projectPage}
                  project={project}
                  archived
                />
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {rows.map((item) => (
                <MilestonesTableRow
                  milestone={item}
                  key={Math.random()}
                  projectPage={projectPage}
                  project={project}
                />
              ))}
            </TableBody>
          )}

        </Table>
      </TableContainer>
    </>
  );
};

export default MilestonesTableOnSinglePages;
