import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import CardActionArea from '@material-ui/core/CardActionArea';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import CustomBadge from '../CustomBadge/CustomBadge.jsx';
import { findProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import DevAvatars from '../DevAvatars/DevAvatars.jsx';
import DeleteModal from '../DeleteModal/DeleteModal.jsx';
import AddNewMilestoneModal from '../AddNewMilestoneModal/AddNewMilestoneModal.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '250px',
    width: '100%',
    marginRight: 20,
    marginBottom: 20,
    background: '#fff',
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
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    margin: '10px',
    backgroundColor: '#32418c',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  },
  medium: {
    width: '25px',
    height: '25px',
  },
  lineClamp5: {
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 3,
  },
  projectInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px',
  },
  price: {
    maxHeight: '20px',
  },
  priceAndDuration: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    maxheight: 50,
  },
  button: {
    color: '#777777',
  },
}));

function difDates(startDate, curDate) {
  const
    difMonth = curDate.getMonth() - startDate.getMonth();
  const difYear = curDate.getFullYear() - startDate.getFullYear();
  const difDay = curDate.getDate() - startDate.getDate();
  if (difYear * 12 + difMonth > 12 && difMonth > 0) {
    return `${difYear} year(s) ${difMonth} month(s)`;
  }
  if (difYear * 12 + difMonth > 12 && difMonth < 0) {
    return `${difYear - 1} year(s) ${12 + difMonth} month(s)`;
  }
  if (difYear * 12 + difMonth > 0 && difMonth > 0) {
    return `${difMonth} month(s)`;
  }
  if (difYear * 12 + difMonth > 0 && difMonth < 0) {
    return `${12 + difMonth} month(s)`;
  }

  return `${difDay} day(s)`;
}

export default function RecipeReviewCard(props) {
  const { card } = props;
  const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(findProject(card.uuid));
    history.push(`/customers/${card.uuid}`);
  }
  const classes = useStyles();
  const startDate = new Date(card.start_date);
  const curDate = new Date();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea onClick={handleClick}>
          <div className={classes.cardHeader}>
            {card.name.length > 1 ? (
              <Avatar aria-label="recipe" className={classes.avatar}>
                {card.name[0].toUpperCase()}
                {card.name[1].toLowerCase()}
              </Avatar>
            ) : (
              <Avatar aria-label="recipe" className={classes.avatar}>
                {card.name[0].toUpperCase()}
              </Avatar>
            )}
            {card.name}
            <CustomBadge
              text={card.status}
              icon={<FiberManualRecordSharpIcon />}
              status={card.status}
            />
          </div>
          <CardContent>
            <div className={classes.projectInfo}>
              <div className={classes.priceAndDuration}>
                <CustomBadge text={difDates(startDate, curDate)} theme="duration" style={{ marginTop: '20px' }} />
              </div>
              <div>
                <div style={{ margin: '10px', display: 'flex' }}>
                  {/* {projectStack} */}
                </div>
              </div>
            </div>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.lineClamp5}>
              {card.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div className={classes.cardFooter}>
          <Tooltip title={card.ProjectMilestones.length === 0 ? 'Delete project' : 'This project contains resources, it can`t be deleted'}>
            <span>
              <Button
                disabled={card.ProjectMilestones.length !== 0}
                className={classes.button}
                onClick={() => setdeleteModalIsOpen(true)}
              >
                <DeleteOutlineIcon />
              </Button>
            </span>
          </Tooltip>
          <DevAvatars
            milestones={card.ProjectMilestones}
            addUserModalOpen={addUserModalOpen}
            setAddUserModalOpen={setAddUserModalOpen}
          />

        </div>
      </Card>
      <DeleteModal
        milestones={card.ProjectMilestones}
        deleteModalIsOpen={deleteModalIsOpen}
        setdeleteModalIsOpen={setdeleteModalIsOpen}
        id={card.uuid}
        name={card.name}
      />

      <AddNewMilestoneModal
        addUserModalOpen={addUserModalOpen}
        setAddUserModalOpen={setAddUserModalOpen}
        curProject={{ ...card }}
        isEdit
      />
    </>
  );
}
