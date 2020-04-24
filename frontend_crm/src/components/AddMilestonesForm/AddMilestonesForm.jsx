import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import AddUserModal from '../AddUserModal/AddUserModal.jsx';
import CustomBage from '../CustomBadge/CustomBadge.jsx';
import MenuBotton from './MenuBotton.jsx';
import { paymentTypes } from '../../constants/constants';


const useStyles = makeStyles((theme) => ({
  modal: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    maxHeight: '170px',
    width: '100%',
    marginRight: 20,
    marginBottom: 20,
    background: '#F2F2F2',
    // background: 'black',
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
}));

function AddMilestonesForm(props) {
  const classes = useStyles();
  const {
    forRead,
    setProject,
    project,
    projectMilestones,
    milestonesChange,
    isEdit,
    setProjectMilestones,
  } = props;
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const handleClick = () => {
    setAddUserModalOpen(true);
  };

  const milestones = projectMilestones.map((milestone) => {
    // const user = users.find((elem) => elem.uuid === milestone.user_uuid);
    const user = milestone.Users;
    const userName = `${user.firstName} ${user.lastName}`;
    const start = new Date(milestone.start_date);
    const end = new Date(milestone.end_date);
    const startDate = `Start: ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`;
    const endDate = milestone.end_date ? `End: ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}` : 'End: -/-/-';
    const paymentType = paymentTypes.find((item) => item.value === milestone.rate_type).label;
    const lightingMilestone = clsx(classes.root, {
      [classes.cardColor]: (milestone.rate !== 0 && milestone.rate !== null),
    });
    return (
      <Grid item container key={Math.random()} className={classes.projectWithRate} justify="flex-start" sm={12} md={6} lg={4}>
        <Card className={lightingMilestone}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography style={{ marginLeft: '7px' }}>
              <b>{userName}</b>
            </Typography>
            {isEdit ? (
              <MenuBotton
                project={project}
                setProject={setProject}
                milestones={projectMilestones}
                singleMilestone={milestone}
                setProjectMilestones={setProjectMilestones}
              />
            ) : ''}
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
      </Grid>
    );
  });


  return (
    <>
      <Grid container spacing={1} style={{ alignItems: 'center', marginTop: '5px' }}>

        {milestones}
        {isEdit
          ? (
            <Grid item xs={1}>
              <Tooltip title="Set user">
                <IconButton aria-label="delete" onClick={handleClick}>
                  <AddCircleOutlineSharpIcon style={{ fontSize: '30px' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : ''}
      </Grid>
      {isEdit ? (
        <AddUserModal
          forRead={forRead}
          projectMilestones={projectMilestones}
          addUserModalOpen={addUserModalOpen}
          setAddUserModalOpen={setAddUserModalOpen}
          curProject={project}
          milestonesChange={milestonesChange}
        />
      )
        : ''}
    </>
  );
}

export default AddMilestonesForm;
