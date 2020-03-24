import React, { useState, useEffect } from 'react';
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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import { findProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#32418c',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, id) {
  return { name, id };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginRight: 20,
  },
  button: {
    color: '#777777',
  },
});

export default function ProjectsList(props) {
  const classes = useStyles();
  // const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);
  const { projects } = props
  const history = useHistory();
  const dispatch = useDispatch();
  const rows = projects.map((project) => createData(project.name, project._id))

  function handleClick(id) {
    console.log(id)
    dispatch(findProject(id));
    history.push(`/projects/${id}`);
  }

  return (
    <TableContainer component={Paper} style={{ marginRight: 20 }}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead color='primary'>
          <TableRow>
            <StyledTableCell>Project Name</StyledTableCell>
            <StyledTableCell align="right">TableCell</StyledTableCell>
            <StyledTableCell align="right">TableCell</StyledTableCell>
            <StyledTableCell align="right">TableCell</StyledTableCell>
            <StyledTableCell align="right">TableCell</StyledTableCell>
            {/* <StyledTableCell align="right">Action</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(project => (
            <StyledTableRow
              style={{ cursor: 'pointer' }}
              key={project.name}
              onClick={() => handleClick(project.id)}>
              <StyledTableCell component="th" scope="row">
                {project.name}
              </StyledTableCell>
              <StyledTableCell align="right">{project.calories}</StyledTableCell>
              <StyledTableCell align="right">{project.fat}</StyledTableCell>
              <StyledTableCell align="right">{project.carbs}</StyledTableCell>
              <StyledTableCell align="right">{project.protein}</StyledTableCell>
              {/* <StyledTableCell align="right">
                <Button className={classes.button} onClick={() => setdeleteModalIsOpen(true)}>
                  <DeleteOutlineIcon />
                </Button>
              </StyledTableCell> */}
              {/* <DeleteModal deleteModalIsOpen={deleteModalIsOpen} setdeleteModalIsOpen={setdeleteModalIsOpen} id={project._id} name={project.name} /> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
