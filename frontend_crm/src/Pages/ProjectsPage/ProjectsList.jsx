import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const columns = [
  { id: 'project', label: 'Project Name', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 50 },
  {
    id: 'workers',
    label: 'Workers',
    minWidth: 250,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'salaries',
    label: 'Salaries',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'mark',
    label: 'Mark',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
];

function createData(project, status, workers, salaries, mark) {
  return {
    project, status, workers, salaries, mark,
  };
}

const rows = [
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),
  createData('BlackList', 'Active', 'HPT_Team', 0, 'excellent'),

];


function ProjectsList({ classes }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (

    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        pr={100}
                // display="inline-flex"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ProjectsList;
