import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import TableContainer from '@material-ui/core/TableContainer';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { milestonesTableCells } from '../../constants/constants';
import MilestonesTableHeaderCells from '../../components/MilestonesTableHeaderCell/MilestonesTableHeaderCell.jsx';
import MilestonesTableRow from '../../components/MilestonesTableRow/MilestonesTableRow.jsx';

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


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function createData(name,
  user,
  participants,
  rate,
  rpd,
  load,
  withdraw,
  platform,
  comments,
  startDate) {
  return {
    name,
    user,
    participants,
    rate,
    rpd,
    load,
    withdraw,
    platform,
    comments,
    startDate,
  };
}

const MilestonesList = (props) => {
  const classes = useStyles();
  const { milestones, setVisibeCells, visibeCells } = props;
  const rows = milestones.map((milestone) => {
    let startDate = new Date(milestone.start_date);
    startDate = startDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return createData(
      milestone.Projects.name,
      milestone.Users.fullName,
      milestone.participants,
      milestone.rate,
      milestone.rpd,
      milestone.load,
      milestone.withdraw,
      milestone.platform,
      milestone.comment,
      startDate,
    );
  });
  const handleChange = (e) => {
    setVisibeCells(e.target.value);
  };

  return (
    <>
      <FormControl className='form-control'>
        <InputLabel>Cells</InputLabel>
        <Select
          name="visibeCells"
          multiple
          value={visibeCells}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
        >
          {milestonesTableCells.map((cellName) => (

            <MenuItem key={cellName.label} value={cellName.label}>
              <Checkbox color='primary' checked={visibeCells.indexOf(cellName.label) > -1} />
              <ListItemText primary={cellName.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper} style={{ marginRight: 20 }}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead color='primary'>
            <TableRow>
              {
                milestonesTableCells.map((cell) => {
                  if (visibeCells.includes(cell.label)) {
                    return (
                      <MilestonesTableHeaderCells
                        key={Math.random()}
                        // order={order}
                        // setOrder={setOrder}
                        // sort={sort}
                        // setSort={setSort}
                        cell={cell}
                      />
                    );
                  }
                  return false;
                })
          }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((milestone) => (
              <MilestonesTableRow
                key={Math.random()}
                visibeCells={visibeCells}
                milestone={milestone}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MilestonesList;
