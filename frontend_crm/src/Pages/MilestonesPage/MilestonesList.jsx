/* eslint-disable camelcase */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function createData(name,
  user,
  person,
  participant,
  rate,
  rpd,
  load,
  withdraw,
  platform,
  comment,
  startDate,
  user_uuid,
  project_uuid,
  role) {
  return {
    name,
    user,
    person,
    participant,
    rate,
    rpd,
    load,
    withdraw,
    platform,
    comment,
    startDate,
    user_uuid,
    project_uuid,
    role,
  };
}

const MilestonesList = (props) => {
  const classes = useStyles();
  const {
    milestones, setVisibeCells, visibeCells, sort, setSort, order, setOrder,
  } = props;
  const rows = milestones.map((milestone) => {
    let startDate = 'not-started';
    console.log(milestone);
    if (milestone.Person !== null) {
      startDate = new Date(milestone.Person.start_date);
      startDate = startDate.toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
      console.log('date', startDate);
    }
    let personName = '';
    let personParticipants = '';
    if (milestone.Person !== null) {
      // console.log(milestone.Person.Participants);
      personName = milestone.Person.name;
      personParticipants = milestone.Person.Participants;
      // if (milestone.Person.Participants.length !== 0) personParticipants = milestone.Person.Participants;
      // personParticipants = milestones.Person.Participants.name;
    }
    // const fullName = `${milestone['Users.firstName']} ${milestone['Users.lastName']}`;
    return createData(
      milestone.Projects.name,
      milestone.Users.fullName,
      personName,
      personParticipants,
      milestone.rate,
      milestone.rpd,
      milestone.load,
      milestone.withdraw,
      milestone.platform,
      milestone.comment,
      startDate,
      milestone.user_uuid,
      milestone.project_uuid,
      milestone.role,
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
                        order={order}
                        setOrder={setOrder}
                        sort={sort}
                        setSort={setSort}
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
