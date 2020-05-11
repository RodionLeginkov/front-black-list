// import React from 'react';
// import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// import PersonListItem from '../PersonListItem/PersonListItem.jsx';

// const PersonsList = (props) => {
//   const {
//     projectPersons,
//     projectId,
//     personDelete,
//     personChange,
//   } = props;
//   const persons = projectPersons ? projectPersons.map((item) => (
//     <Grid item container sm={12} spacing={1} key={Math.random()} alignItems="center">
//       <PersonListItem
//         person={item}
//         projectId={projectId}
//         personChange={personChange}
//         personDelete={personDelete}
//       />
//     </Grid>
//   )) : '';
//   return (
//     <>
//       <Grid container spacing={1} style={{ padding: '10px 0px 5px' }}>
//         {persons}
//       </Grid>
//     </>
//   );
// };

// export default PersonsList;

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import PersonListItem from '../PersonListItem/PersonListItem.jsx';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#32418C',
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

function createData(person) {
  return {
    ...person
  };
}

const PersonsList = (props) => {
  const {
    projectPersons,
    projectId,
    personDelete,
    personChange,
  } = props;
  const classes = useStyles();

  const rows = projectPersons.map((person) => createData(person));
  // console.log(rows, projectPersons)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow backgroundColor='#32418C'>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (

            <PersonListItem
              person={row}
              projectId={projectId}
              personChange={personChange}
              personDelete={personDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


export default PersonsList;
