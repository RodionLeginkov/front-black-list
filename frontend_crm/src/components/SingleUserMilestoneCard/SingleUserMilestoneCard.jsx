import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import ErrorOutlineSharpIcon from '@material-ui/icons/ErrorOutlineSharp';
import CustomBage from '../CustomBadge/CustomBadge.jsx';
import MenuButton from '../AddMilestonesForm/MenuButton.jsx';
import MilestoneInfoModal from '../MilestoneInfoModal/MilestoneInfoModal.jsx';
import { paymentTypes } from '../../constants/constants';
import './SingleUserMilestoneCardStyle.css';

// mport MilestoneInfoModal from '../MilestoneInfoModal/MilestoneInfoModal.jsx';
// import MilestoneInfoModal from '../MilestoneInfoModal/MilestoneInfoModal.jsx';

const useStyles = makeStyles((theme) => ({
  modal: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    // maxHeight: '170px',
    minWidth: '170px',
    maxWidth: '30%',
    marginRight: 20,
    marginBottom: 20,
    background: '#F2F2F2',
    color: '#555',
    borderRadius: 2,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    },
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-between',
  },
  breadcrumbs: {
    margin: '85px 20px 40px 0px',
    color: '#777777',
    cursor: 'pointer',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: '20px 40px',
  },
  content: {
    margin: '0px 20px',
    display: 'flex',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  position: {
    display: 'flex',
    alignItems: 'Center',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '13 px',
  },
  submitButton: {
    width: '30%',
    margin: '20px 0',
  },
  inputForm: {
    width: '100%',
    margin: '5px 0',
  },
  descriptionForm: {
    maxHeight: '200px',
    width: '100%',
  },
  smallForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardHeader: {
    marginTop: '5px',
    display: 'flex',
    fontSize: '16px',
    alignItems: 'center',
  },
  cardColor: {
    background: '#deedff',
  },
  expiredMilestone: {
    background: '#ffe6ff',
  },
}));

const SingleUserMilestoneCard = (props) => {
  const classes = useStyles();
  const {
    milestone,
    user,
    showInfo,
    archived,
  } = props;

  const project = milestone.Projects;
  const start = new Date(milestone.start_date);
  const end = new Date(milestone.end_date);
  const curDate = new Date();
  const startDate = `Start: ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`;
  const endDate = milestone.end_date ? `End: ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}` : 'End: -/-/-';
  const personName = milestone.person_uuid && project.Person ? project.Person.find((p) => p.uuid === milestone.person_uuid).name : '';
  const isExpired = milestone.end_date && (end - curDate) < 0;
  // console.log('isExpired  ', isExpired);
  let paymentType;
  if (milestone.rate_type === 'hourly' || milestone.rate_type === 'flat_rate' || milestone.rate_type === 'fixed' || milestone.rate_type === 'weekly') {
    paymentType = `${project.rate_type !== '' ? paymentTypes.find((item) => item.value === milestone.rate_type).label : '–'}`;
  } else {
    paymentType = '–';
  }
  const [openModal, setOpenModal] = useState(false);
  const lightingMilestone = clsx(classes.root, {
    [classes.cardColor]: (milestone.rate !== 0 && milestone.rate !== null),
    [classes.expiredMilestone]: (isExpired),
  });
  const handleClick = () => {
    setOpenModal(true);
  };
  //   return (false);
  // };
  return (
    <Grid
      item
      container
      key={Math.random()}
      justify="flex-start"
      sm={12}
      md={6}
      lg={4}
    >
      <Card className={lightingMilestone} onClick={handleClick}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
        >
          <div style={{ marginLeft: '7px' }}>
            <Typography>
              <b>
                {project.name}
              </b>
            </Typography>
            <Typography>
              <b>
                {milestone.person_uuid
                  ? `(${personName})`
                  : ''}
              </b>
            </Typography>
          </div>
          {isExpired ? <ErrorOutlineSharpIcon /> : ''}
        </div>
        <CustomBage
          text={milestone.role}
          size="medium"
          position={user.role}
          currentProject
        />
        <CardContent style={{ padding: '7px' }}>
          <Typography>
            {milestone.rate}
            {' '}
            {paymentType}
          </Typography>
          <Typography>
            {startDate}
          </Typography>
          <Typography>
            {endDate}
          </Typography>
        </CardContent>
      </Card>
      {!showInfo
        ? (
          <MilestoneInfoModal
            project={milestone}
            openModal={openModal}
            setOpenModal={setOpenModal}
            customer={project}
            archived={archived}
            userPage
          />
        ) : ''}
    </Grid>
  );
};

export default SingleUserMilestoneCard;
