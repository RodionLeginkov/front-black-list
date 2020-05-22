import React from 'react';
import { useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { findProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

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

function createData(name, description, customer, id, start, type, intensity) {
  return {
    name, description, customer, id, start, type, intensity,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginRight: 20,
  },
});

export default function ProjectsList(props) {
  const classes = useStyles();
  const { projects } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  // eslint-disable-next-line array-callback-return
  const rows = projects.map((project) => {
    const start = project.ProjectMilestones.length ? new Date(project.ProjectMilestones[0].start_date) : '';// new Date(milestone.start_date);
    const startDate = start ? ` ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}` : 'Not-started';

    return createData(project.name, project.description, project.customer, project.uuid, startDate, project.communicationType, project.communicationIntensity);
  });
  function handleClick(id) {
    dispatch(findProject(id));
    history.push(`/customers/${id}`);
  }

  return (
    <TableContainer component={Paper} style={{ marginRight: 20 }}>
      <Table className={classes.table}>
        <TableHead color='primary'>
          <TableRow>
            <StyledTableCell>Project Name</StyledTableCell>
            <StyledTableCell align="right">Customer</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Communication type</StyledTableCell>
            <StyledTableCell align="right">Communication Intensity</StyledTableCell>
            <StyledTableCell align="right">Start Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((project) => (
            <StyledTableRow
              style={{ cursor: 'pointer' }}
              key={project.name}
              onClick={() => handleClick(project.id)}
            >
              <StyledTableCell component="th" scope="row">
                {project.name}
              </StyledTableCell>
              <StyledTableCell align="right">{project.customer}</StyledTableCell>
              <StyledTableCell align="right">{project.description}</StyledTableCell>
              <StyledTableCell align="right">{project.type}</StyledTableCell>
              <StyledTableCell align="right">{project.intensity}</StyledTableCell>
              <StyledTableCell align="right">{project.start}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
