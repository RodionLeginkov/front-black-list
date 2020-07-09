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
import moment from 'moment';
import { TextField } from '@material-ui/core';
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

function createData(name, description, customer, id, start, type, intensity, location, wokringHours, timezone) {
  return {
    name, description, customer, id, start, type, intensity, location, wokringHours, timezone,
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

  const countTime = (cur, other) => {
    const result = cur - other;
    if (result > 0) return (`+${result}`);
    return result;
  };
  // eslint-disable-next-line array-callback-return
  const rows = projects.map((project) => {
    const curDate = moment.utc(new Date()).format();
    const customerTime = project && project.timezone ? (moment.tz(`${curDate}`, `${project.timezone.split(')')[1]}`).format('HH:mm')) : '';
    const currentHour = project && project.timezone ? (moment.tz(`${curDate}`, `${project.timezone.split(')')[1]}`).format('HH')) : '';
    const utc = moment.utc().format('HH');
    const moscow = moment.tz('Europe/Moscow').format('HH');
    const start = project.ProjectMilestones.length ? new Date(project.ProjectMilestones[0].start_date) : '';// new Date(milestone.start_date);
    const startDate = start ? ` ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}` : 'Not-started';
    const startWork = project && project.workStart ? moment(project.workStart) : '';
    const endWork = project && project.workEnd ? moment(project.workEnd) : '';
    const wokringHours = startWork && endWork ? `${startWork.format('HH:mm')} - ${endWork.format('HH:mm')}` : '―';
    const timezone = project && project.timezone ? (
      `${customerTime} (UTC ${countTime(currentHour, utc)} / MSC ${countTime(currentHour, moscow)})`
    ) : '―';

    return createData(project.name, project.description, project.customer, project.uuid, startDate, project.communicationType, project.communicationIntensity, project.location, wokringHours, timezone);
  });
  function handleClick(id) {
    dispatch(findProject(id));
    history.push(`/customers/${id}`);
  }

  return (
    <TableContainer component={Paper} style={{ marginRight: 20, maxHeight: '800px' }}>
      <Table stickyHeader className={classes.table}>
        <TableHead color='primary'>
          <TableRow>
            <StyledTableCell>Project Name</StyledTableCell>
            <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>Customer</StyledTableCell>
            <StyledTableCell align="left" style={{ whiteSpace: 'noWrap', minWidth: '200px' }}>Description</StyledTableCell>
            <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>Communication type</StyledTableCell>
            <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>Communication Intensity</StyledTableCell>
            <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>Location</StyledTableCell>
            <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>Customer time:</StyledTableCell>
            <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>Wokring hours:</StyledTableCell>
            <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>Start Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((project) => (
            <StyledTableRow
              style={{ cursor: 'pointer' }}
              key={project.name}
              onClick={() => handleClick(project.id)}
            >
              <StyledTableCell component="th" scope="row" style={{ whiteSpace: 'noWrap' }}>
                {project.name}
              </StyledTableCell>
              <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>{project.customer}</StyledTableCell>
              <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>{project.description}</StyledTableCell>
              <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>{project.type}</StyledTableCell>
              <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>{project.intensity}</StyledTableCell>
              <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>{project.location}</StyledTableCell>
              <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>{project.timezone}</StyledTableCell>
              <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>{project.wokringHours}</StyledTableCell>
              <StyledTableCell align="left" style={{ whiteSpace: 'noWrap' }}>{project.start}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
