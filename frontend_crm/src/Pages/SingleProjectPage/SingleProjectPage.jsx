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
import UserList from '../../components/UserList/UserList.jsx';
import StackIcon from '../../components/StackIcon/StackIcon.jsx';
import Loading from '../../components/Loading/index.jsx';
import { getProject, getProjects } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';
import DeleteModal from '../../components/DeleteModal/DeleteModal.jsx'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

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
    cursor: 'pointer',
  },
  button: {
    color: '#777777',
  },
}));

function CurrentProject(props) {
  const classes = useStyles();
  const history = useHistory();
  const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);

  function handleClick() {
    history.push('/projects');
  }

  const { projectId } = props.match.params;

  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.currentProject);
  useEffect(() => {
    if (!project) {
      dispatch(getUsers());
      dispatch(getProjects());
      dispatch(getProject(projectId));
    }
  }, [dispatch, projectId, project]);
  let stackList = [];
  if (!project) { return (<Loading />); }
  
  if (project) {
    stackList = project.stack.map((elem) => (
      <StackIcon key={Math.random()} tech={elem.tech} size='medium' />
    ));
  }
  return (
    <div style={{ marginLeft: '85px' }}>

      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Link color="inherit" onClick={() => history.push('/projects')}   >
          Projects
        </Link>
        <Typography color="textPrimary" onClick={() => history.push(`/projects/${project._id}`)} >{project.name}</Typography>
      </Breadcrumbs>
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

        <UserList users={project.developers} />

        <div className={classes.content}>
          <h2 style={{ marginTop: 0 }}>Description: </h2>
          <Typography className={classes.description}>
            {project.description}
          </Typography>
        </div>
        <Divider />
        <div className={classes.footerIcons}>
          <Button className={classes.button} onClick={handleClick}>
            <ArrowBackIosIcon />
          </Button>
          <Button className={classes.button}
            onClick={() => history.push(`/projects/editproject/${project._id}`)}>
            <EditSharpIcon />
          </Button>
          <Button className={classes.button} onClick={() => setdeleteModalIsOpen(true)}>
            <DeleteOutlineIcon />
          </Button>
        </div>
      </Paper>
      <DeleteModal deleteModalIsOpen={deleteModalIsOpen} setdeleteModalIsOpen={setdeleteModalIsOpen} id={project._id} name={project.name} />
      {/* <ProjectModal isOpen={isOpen} setIsOpen={setIsOpen} curProject={{...project}} isEdit /> */}
      {/* <AddProjectPage curProject={{...project}} isEdit /> */}
    </div>
  );
}
export default CurrentProject;
