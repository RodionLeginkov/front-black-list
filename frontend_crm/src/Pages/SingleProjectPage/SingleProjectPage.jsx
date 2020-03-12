import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import CustomBadge from '../../components/CustomBadge/CustomBadge.jsx';
import CustomList from '../../components/CustomList/CustomList.jsx';
import StackIcon from '../../components/StackIcon/StackIcon.jsx';
import Loading from '../../components/Loading/index.jsx';
import { deleteProject, getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import ProjectModal from '../ProjectsPage/ProjectsModal.jsx';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';

const useStyles = makeStyles(() => ({
  footerIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    margin: '0 auto',
    maxWidth: '900px',
    marginTop: '30px',
  },
  content: {
    margin: '0px 20px',
    display: 'flex',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stackIcons: {
    margin: '10px',
    display: 'flex',
  },
  stackAndDuration: {
    margin: '0px 20px',
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    margin: '4px 13px',
    paddingBottom: '10px',
  },
  duration: {
    margitTop: '3px  !important',
  },
  breadcrumbs: {
    margin: '85px 20px',
    color: '#777777',
  },
}));

function CurrentProject(props) {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  function handleClick() {
    history.push('/projects');
  }

  const { projectId } = props.match.params;

  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.currentProject);
  useEffect(() => {
    if (!project) {
      dispatch(getUsers());
      dispatch(getProject(projectId));
    }
  }, [dispatch, projectId, project]);

  function handleDelete() {
    dispatch(deleteProject(project._id));
    history.push('/projects');
  }
  let stackList = [];
  if (!project) { return (<Loading />); }

  stackList = project.stack.map((elem) => (
    <StackIcon key={Math.random()} tech={elem} size='medium' />
  ));

  return (
    <div style={{ marginLeft: '85px' }}>
      <h5 className={classes.breadcrumbs}>
        Projects/
        {project.name}
      </h5>
      <Paper className={classes.root}>
        <div
          className={clsx(classes.content, classes.header)}
        >
          <h1>{project.name}</h1>
          <div style={{ marginRight: '10px' }}>
            <CustomBadge text={project.status} icon={<FiberManualRecordSharpIcon />} status={project.status} size="large" />
          </div>
        </div>
        <Divider />
        <div className={classes.stackAndDuration}>
          <h2>Stack: </h2>
          <div className={classes.stackIcons}>
            {stackList}
          </div>
        </div>
        <div className={classes.stackAndDuration}>
          <h2>Duration: </h2>
          <div style={{ margin: '10px' }}>
            <Typography className={classes.duration}>
              {project.duration}
            </Typography>
          </div>
        </div>
        <CustomList />

        <div className={classes.content}>
          <h2 style={{ marginTop: 0 }}>Description: </h2>
          <Typography className={classes.description}>
            {project.description}
          </Typography>
        </div>
        <Divider />
        <div className={classes.footerIcons}>
          <Button onClick={handleClick}>
            <ArrowBackIosIcon />
          </Button>
          <Button onClick={() => setIsOpen(true)}>
            <EditSharpIcon />
          </Button>
          <Button onClick={handleDelete} className={classes.deleteButton}>
            <DeleteOutlineIcon />
          </Button>
        </div>
      </Paper>

      <ProjectModal isOpen={isOpen} setIsOpen={setIsOpen} curProject={{ ...project }} isEdit />
    </div>
  );
}
export default CurrentProject;
