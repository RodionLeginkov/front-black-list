import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MilestoneInfoModal from '../MilestoneInfoModal/MilestoneInfoModal.jsx';

const ArchivedMilestonesTableRow = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const { milestone, archived } = props;
  const handleClick = () => {
    setOpenModal(true);
  };
  const start = new Date(milestone.start_date);
  const end = new Date(milestone.end_date);
  const startDate = `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`;
  const endDate = milestone.end_date ? `${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}` : 'End: -/-/-';

  return (
    <>
      <TableRow onClick={handleClick}>
        <TableCell align="center" component="th" scope="row">
          {milestone.Projects.name}
        </TableCell>
        <TableCell align="center">{milestone.role}</TableCell>
        <TableCell align="center">{milestone.load}</TableCell>
        <TableCell align="center">{startDate}</TableCell>
        <TableCell align="center">{endDate}</TableCell>
        <TableCell align="center">{milestone.comment}</TableCell>
      </TableRow>
      <MilestoneInfoModal
        project={milestone}
        openModal={openModal}
        setOpenModal={setOpenModal}
        customer={milestone.Projects}
        archived={archived}
        userPage
      />
    </>
  );
};

export default ArchivedMilestonesTableRow;
