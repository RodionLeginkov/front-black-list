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
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import moment from 'moment';
import CustomBadge from '../../components/CustomBadge/CustomBadge.jsx';
import Loading from '../../components/Loading/index.jsx';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';
import DeleteModal from '../../components/DeleteModal/DeleteModal.jsx';
import AddMilestonesForm from '../../components/AddMilestonesForm/AddMilestonesForm.jsx';
import PersonsList from '../../components/PersonsList/PersonsList.jsx';

const useStyles = makeStyles(() => ({
  footerIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    margin: '0 auto',
    maxWidth: '1100px',
    marginTop: '30px',
  },
  content: {
    margin: '0px 10px',
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
  Descriptions: {
    margin: '0px 20px',
    display: 'flex',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: '16px',
    paddingLeft: '5px',
  },
  description: {
    margin: '4px 13px',
    paddingBottom: '10px',
  },
  breadcrumbs: {
    margin: '85px 20px',
    color: '#777777',
    cursor: 'pointer',
  },
  button: {
    color: '#777777',
  },
  headerText: {
    fontSize: '18px',
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}


const CurrentProject = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);

  const handleClick = () => history.push('/customers');

  const { projectId } = match.params;
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.currentProject);

  const start = project && project.workStart ? moment(project.workStart) : '';
  const end = project && project.workEnd ? moment(project.workEnd) : '';

  const curDate = moment.utc(new Date()).format();
  const customerTime = project && project.timezone ? (moment.tz(`${curDate}`, `${project.timezone.split(')')[1]}`).format('HH:mm')) : '';
  const currentHour = project && project.timezone ? (moment.tz(`${curDate}`, `${project.timezone.split(')')[1]}`).format('HH')) : '';
  const utc = moment.utc().format('HH');
  const moscow = moment.tz('Europe/Moscow').format('HH');
  const countTime = (cur, other) => {
    const result = cur - other;
    if (result > 0) return (`+${result}`);
    return result;
  };
  useEffect(() => {
    dispatch(getUsers('', '', '', '', '', 'Active'));
    if (!project || !project.ProjectMilestones || project.uuid !== projectId || !project.Person) {
      dispatch(getProject(projectId));
    }
  }, [dispatch, projectId, project]);

  if (!project || !project.ProjectMilestones) {
    return (<Loading />);
  }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Typography color="textPrimary" onClick={() => history.push('/customers')}>Customers</Typography>
        <Typography color="textPrimary" onClick={() => history.push(`/customers/${project.uuid}`)}>{project.name}</Typography>
      </Breadcrumbs>
      <Paper className={classes.root}>
        <div
          className={clsx(classes.content, classes.header)}
        >
          <h1>{project.name}</h1>
        </div>
        <Divider />
        <div className={classes.Descriptions}>
          <h2 className={classes.headerText}>Description: </h2>
          <div className={classes.descriptionText}>
            {project.description}
          </div>
        </div>
        <div className={classes.Descriptions}>
          <h2 className={classes.headerText}>Customer: </h2>
          <div className={classes.descriptionText}>
            {project.customer}
          </div>
        </div>
        <div className={classes.Descriptions}>
          <h2 className={classes.headerText}>Communication type: </h2>
          <div className={classes.descriptionText}>
            {project.communicationType}
          </div>
        </div>
        <div className={classes.Descriptions}>
          <h2 className={classes.headerText}>Communication Intensity: </h2>
          <div className={classes.descriptionText}>
            {project.communicationIntensity}
          </div>
        </div>
        <div className={classes.Descriptions}>
          <h2 className={classes.headerText}>Location: </h2>
          <div className={classes.descriptionText}>
            {project.location}
          </div>
        </div>
        <div className={classes.Descriptions}>
          <h2 className={classes.headerText}>Working hours: </h2>
          <div className={classes.descriptionText}>
            {start && end ? (
              ` ${start.format('HH:mm')} - ${end.format('HH:mm')}`
            ) : '―'}

          </div>
        </div>
        <div className={classes.Descriptions}>
          <h2 className={classes.headerText}>Customer time: </h2>
          <div className={classes.descriptionText}>
            {customerTime ? (
              `${customerTime} (UTC ${countTime(currentHour, utc)} / MSC ${countTime(currentHour, moscow)})`
            ) : '―'}

          </div>
        </div>
        <div className={classes.stackAndEnglish}>
          <h2 className={classes.headerText}>Resources: </h2>

          <Tabs
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="simple tabs example"
            value={value}
            onChange={handleChangeTab}
          >
            <Tab label="Resources" {...a11yProps(0)} />
            <Tab label="Persons" {...a11yProps(1)} />
            <Tab label="History" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <AddMilestonesForm
              showInfo
              project={project}
              projectMilestones={project.ProjectMilestones}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PersonsList
              // personDelete={personDelete}
              // personChange={personChange}

              projectPersons={project.Person}
              projectId={project.uuid}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AddMilestonesForm
              showInfo
              project={project}
              projectMilestones={project.ProjectMilestones}
              archived
            />
          </TabPanel>
        </div>

        {/* <div className={classes.content}>
          <h2 style={{ marginTop: 0 }}>Description: </h2>
          <Typography className={classes.description}>
            {project.description}
          </Typography>
        </div> */}
        <Divider />
        <div className={classes.footerIcons}>
          <Button className={classes.button} onClick={handleClick}>
            <ArrowBackIosIcon />
          </Button>
          <Button
            className={classes.button}
            onClick={() => history.push(`/customer/${project.uuid}`)}
          >
            <EditSharpIcon />
          </Button>
          <Tooltip title={project.ProjectMilestones.length === 0 ? 'Delete project' : 'This project contains resources, it can`t be deleted'}>
            <span>
              <Button
                disabled={project.ProjectMilestones.length !== 0}
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
