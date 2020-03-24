import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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

function createData(name) {
  return { name };
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
  const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);
  const { projects } = props

  const rows = projects.map((project) => createData(project.name))
  return (
    <TableContainer component={Paper} style={{ marginRight: 20 }}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead color='primary'>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            {/* <StyledTableCell align="right">Action</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(project => (
            <StyledTableRow key={project.name}>
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
