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
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Tooltip from '@material-ui/core/Tooltip';
import CustomBadge from '../../components/CustomBadge/CustomBadge.jsx';
import Loading from '../../components/Loading/index.jsx';
import { getProject, getProjects } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';
import DeleteModal from '../../components/DeleteModal/DeleteModal.jsx';
import AddMilestonesForm from '../../components/AddMilestonesForm/AddMilestonesForm.jsx';


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
  stackAndEnglish: {
    margin: '0px 20px',
  },
  description: {
    margin: '4px 13px',
    paddingBottom: '10px',
  },
  english: {
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

const CurrentProject = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);

  const handleClick = () => history.push('/projects');

  const { projectId } = match.params;

  const dispatch = useDispatch();

  const project = useSelector((state) => state.projects.currentProject);
  useEffect(() => {
    if (!project || !project.Projects_Milestones) {
      dispatch(getProject(projectId));
    }
  }, [dispatch, projectId, project]);

  if (!project || !project.Projects_Milestones){
     return (<Loading />);
  }
  return (
    <div style={{ marginLeft: '85px' }}>

      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Typography color="textPrimary" onClick={() => history.push('/projects')}>Projects</Typography>
        <Typography color="textPrimary" onClick={() => history.push(`/projects/${project.uuid}`)}>{project.name}</Typography>
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
        <div className={classes.stackAndEnglish}>
          <h2>Stack: </h2>
          <div className={classes.stackIcons}>
            {/* {projectStack} */}
          </div>
        </div>
        <div className={classes.stackAndEnglish}>
          <h2>Milestones: </h2>

          <AddMilestonesForm project={project} projectMilestones={project.Projects_Milestones} />

        </div>

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
          <Button
            className={classes.button}
            onClick={() => history.push(`/project/${project.uuid}`)}
          >
            <EditSharpIcon />
          </Button>
          <Tooltip title={project.Projects_Milestones.length === 0 ? 'Delete project' : 'This project contains resources, it can`t be deleted'}>
            <span>
              <Button
                disabled={project.Projects_Milestones.length !== 0}
                className={classes.button}
                onClick={() => setdeleteModalIsOpen(true)}
              >
                <DeleteOutlineIcon />
              </Button>
            </span>
          </Tooltip>
        </div>
      </Paper>
      <DeleteModal
        deleteModalIsOpen={deleteModalIsOpen}
        setdeleteModalIsOpen={setdeleteModalIsOpen}
        id={project.uuid}
        name={project.name}
      />
    </div>
  );
};
export default CurrentProject;
