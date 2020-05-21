import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MilestoneInfoModal from '../MilestoneInfoModal/MilestoneInfoModal.jsx';

const ArchivedMilestonesTableRow = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const {
    project, milestone, archived, projectPage,
  } = props;
  const handleClick = () => {
    setOpenModal(true);
  };
  const start = new Date(milestone.start_date);
  const end = new Date(milestone.end_date);
  const startDate = `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`;
  const endDate = milestone.end_date ? `${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}` : 'End: -/-/-';
  const name = projectPage ? milestone.Users.fullName : milestone.Projects.name;
  let personName = '';

  if (milestone.Projects) {
    personName = milestone.person_uuid && milestone.Projects.Person ? milestone.Projects.Person.find((p) => p.uuid === milestone.person_uuid).name : '';
  } else {
    personName = milestone.person_uuid && project.Person ? project.Person.find((p) => p.uuid === milestone.person_uuid).name : '';
  }

  // personName = milestone.Projects.Person.name;

  // console.log(personName);
  return (
    <>
      <TableRow onClick={handleClick}>
        <TableCell align="center" component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="center">{milestone.role}</TableCell>
        <TableCell align="center">{milestone.load}</TableCell>
        {!archived ? (
          <TableCell align="center">{personName}</TableCell>
        ) : ''}
        <TableCell align="center">{startDate}</TableCell>
        <TableCell align="center">{endDate}</TableCell>
        <TableCell align="center">{milestone.comment}</TableCell>
      </TableRow>
      <MilestoneInfoModal
        project={milestone}
        openModal={openModal}
        setOpenModal={setOpenModal}
        customer={projectPage ? project : milestone.Projects}
        archived={archived}
        projectPage
      />
    </>
  );
};

export default ArchivedMilestonesTableRow;
