import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from 'react-router-dom';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import CustomBadge from '../CustomBadge/CustomBadge.jsx';
import { findProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import StackIcon from '../StackIcon/StackIcon.jsx';
import DevAvatars from '../DevAvatars/DevAvatars.jsx';
import DeleteModal from '../DeleteModal/DeleteModal.jsx';
import { getProjects } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import AddUserModal from '../AddUserModal/AddUserModal';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   marginTop: 20,
  //   marginRight: 10,
  //   minHeight: 200,
  //   maxWidth: 400,
  //   width: '100%',
  //   display: 'flex',
  //   flexFlow: 'column ',
  //   justifyContent: 'space-between',
  // },
  root: {
    height: '100%',
    maxHeight: '250px',
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
    paddingTop: '56.25%', // 16:9
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



export default function RecipeReviewCard(props) {
  const { card } = props;
  const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(findProject(card._id));
    history.push(`/projects/${card._id}`);
  }
  const classes = useStyles();

  const stackList = card.stack.map((elem) => (
    <StackIcon key={Math.random()} tech={elem.tech} size='small' />
  ));

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea onClick={handleClick}>
          <div className={classes.cardHeader}>
            {card.name.length > 1 ? (
              <Avatar aria-label="recipe" className={classes.avatar}>
                {card.name[0].toUpperCase()}
                {card.name[1].toLowerCase()}
              </Avatar>) : (<Avatar aria-label="recipe" className={classes.avatar}>
                {card.name[0].toUpperCase()}
              </Avatar>)}
            {card.name}
            <CustomBadge text={card.status} icon={<FiberManualRecordSharpIcon />} status={card.status} />
          </div>
          <CardContent>
            <div className={classes.projectInfo}>
              <div className={classes.priceAndDuration}>
                <CustomBadge text={`${card.paymentAmount}$ ${card.paymentType}`} theme="price" />
                { card.duration ? <CustomBadge text={`${card.duration}`} theme="duration" style={{ marginTop: '20px' }} /> : ''}
              </div>
              <div>
                <div style={{ margin: '10px', display: 'flex' }}>
                  {stackList}
                </div>
              </div>
            </div>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.lineClamp5}>
              {card.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div className={classes.cardFooter}>
          <Button className={classes.button} onClick={() => setdeleteModalIsOpen(true)}>
            <DeleteOutlineIcon />
          </Button>
          <DevAvatars users={card.developers} addUserModalOpen={addUserModalOpen} setAddUserModalOpen={setAddUserModalOpen} />

        </div>
      </Card>
      <DeleteModal deleteModalIsOpen={deleteModalIsOpen} setdeleteModalIsOpen={setdeleteModalIsOpen} id={card._id} name={card.name} />
      <AddUserModal addUserModalOpen={addUserModalOpen} setAddUserModalOpen={setAddUserModalOpen} curProject={{ ...card }} isEdit />
    </>
  );
}
