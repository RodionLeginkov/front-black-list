import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { findProject, deleteProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import StackIcon from '../StackIcon/StackIcon.jsx';
import CustomAvatar from '../CustomAvatar/CustomAvatar.jsx';
import AvatarGroup from '@material-ui/lab/AvatarGroup';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    marginRight: 10,
    minHeight: 200,
    maxWidth: 400,
    width: '100%',
    display:'flex',
    flexFlow: 'column ',
    justifyContent: 'space-between',
    // alignItems: 'flex-end',
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
}));



export default function RecipeReviewCard(props) {
  const { card } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteProject(card._id));
    // history.push('/projects');
  }
  
  function handleClick() {
    dispatch(findProject(card._id));
    history.push(`/projects/${card._id}`);
  }
  const classes = useStyles();
  
  const stackList = card.stack.map((elem) => (
      <StackIcon key={Math.random()} tech={elem} size='small' />
  ));
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <div className={classes.cardHeader}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            {card.name[0].toUpperCase()}
            {card.name[1].toLowerCase()}
          </Avatar>
          {card.name}
          <CustomBadge text={card.status} icon={<FiberManualRecordSharpIcon />} status={card.status} />
        </div>
        <CardContent>
          <div className={classes.projectInfo}>
            <div className={classes.priceAndDuration}>
              <CustomBadge text={`${card.price}$/hour`} theme="price" />
              <CustomBadge text={`${card.duration}`} theme="duration" style={{ marginTop: '20px'}}/>
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
      <Button onClick={handleDelete}>
        <DeleteOutlineIcon />
      </Button>
      { card.developers.length > 0 ? 
        <CustomAvatar  users={card.developers} />
       : ''}
      </div>
    </Card>
  );
}
