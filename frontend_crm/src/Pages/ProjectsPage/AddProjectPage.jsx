import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import HelpOutlineSharpIcon from '@material-ui/icons/HelpOutlineSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import {
  getProject, getProjects, addProject, updateProject,
} from '../../Redux/Actions/ProjectsActions/ProjectActions';
import AddMilestonesForm from '../../components/AddMilestonesForm/AddMilestonesForm.jsx';
import { addMilestone } from '../../Redux/Actions/MilestonesActions/MilestonesActions';
import './ProjectStyles.css';


const useStyles = makeStyles((theme) => ({
  modal: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    width: '100%',
    margin: '0 auto',
    maxWidth: '750px',
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBotton: '5px',
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
  helperIcon: {
    color: '#a3a3a3',
    cursor: 'default',
    fontSize: '30px',
  },
}));
const AddProjectPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectId } = props.match.params;
  const curProject = useSelector((state) => state.projects.currentProject);
  const loading = useSelector((state) => state.projects.loadingCurrentProjects);


  const initialValue = (projectId && curProject) ? curProject : {
    name: '',
    communication: '',
    source: '',
    start_date: new Date(),
    end_date: null,
    type: '',
    withdrawal_of_funds: '',
    customer: '',
    description: '',
    history: '',
    Projects_Milestones: [],
  };
  const initialMilestones = (projectId && curProject) ? curProject.Projects_Milestones : [];


  const reqFields = ['name', 'customer', 'description'];
  const [projectMilestones, setProjectMilestones] = useState(initialMilestones);
  const [project, setProject] = useState(initialValue);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setProject(initialValue);
    setProjectMilestones(initialMilestones);
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    if (projectId && !curProject) {
      dispatch(getProjects());
      dispatch(getProject(projectId));
    }

    // eslint-disable-next-line
  }, [dispatch]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const milestonesChange = (newMilestone) => {
    setProjectMilestones([...projectMilestones, newMilestone]);
    setProject({ ...project, Projects_Milestones: [...project.Projects_Milestones, newMilestone] });
  };

  const handleClose = () => (projectId ? history.push(`/customers/${project.uuid}`) : history.push('/customers'));


  const onSubmit = (e) => {
    e.preventDefault();
    const isEmpty = reqFields.find((field) => (!project[field]));
    if (isEmpty === undefined) {
      if (projectId) {
        // eslint-disable-next-line no-restricted-syntax
        // for (const index in projectMilestones) {
        //   if (Number(index) + 1 > curProject.Projects_Milestones.length) {
        //     dispatch(addMilestone(projectMilestones[index]));
        //   }
        // }
        dispatch(updateProject(project));
        dispatch(getProject(projectId));
        history.push(`/customers/${project.uuid}`);
      } else {
        dispatch(addProject(project));
        dispatch(getProjects());
        history.push('/customers');
      }
    } else setIsError(true);
  };

  return (
    <>
      {!projectId
        ? (
          <Breadcrumbs style={{ marginLeft: '85px' }} aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Typography color="textPrimary" onClick={() => history.push('/customers')}>Customers</Typography>
            <Typography color="textPrimary" onClick={() => history.push('/customers/addproject')}>Add new project</Typography>
          </Breadcrumbs>
        )
        : (
          <Breadcrumbs style={{ marginLeft: '85px' }} aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Typography color="textPrimary" onClick={() => history.push('/customers')}>Customers</Typography>
            <Typography color="textPrimary" onClick={() => history.push(`/customers/${project.uuid}`)}>{project.name}</Typography>
            <Typography color="textPrimary" onClick={() => history.push(`/customers/editproject/${project.uuid}`)}>Edit project</Typography>
          </Breadcrumbs>
        )}
      <div className={classes.position} style={{ marginLeft: '85px' }}>
        <Paper className={classes.root}>
          <div
            className={clsx(classes.content, classes.header)}
          >
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
              <div className={classes.header}>
                {!projectId ? <h2>Add new project</h2> : <h2>Edit project</h2>}
                <Tooltip title='close'>
                  <Button onClick={handleClose}>
                    <CloseSharpIcon style={{ color: '#a3a3a3' }} />
                  </Button>
                </Tooltip>
              </div>
              <TextField
                autoFocus
                required
                style={{ marginBottom: 10 }}
                error={!project.name && isError}
                helperText={(!project.name.length && isError) ? 'Empty field.' : ''}
                value={project.name || ''}
                label="Project Name"
                className={classes.inputForm}
                name='name'
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  endAdornment:
  <InputAdornment position="end">
    <Tooltip title="Project Name">
      <HelpOutlineSharpIcon className={classes.helperIcon} />
    </Tooltip>
  </InputAdornment>,

                }}
              />
              <div className={classes.smallForm} />


              <Grid style={{ margin: '0px 0px 10px' }} container justify="space-between">

                <Grid item xs={12}>
                  <TextField
                    error={!project.customer && isError}
                    helperText={(!project.customer && isError) ? 'Empty field.' : ''}
                    style={{ width: '100%' }}
                    value={project.customer}
                    variant="outlined"
                    id="standard-multiline-flexible"
                    label="Customer"
                    multiline
                    rowsMax="5"
                    name='customer'
                    onChange={handleChange}
                  />
                </Grid>

              </Grid>

              <TextField
                error={!project.description && isError}
                helperText={(!project.description && isError) ? 'Empty field.' : ''}
                style={{ marginBottom: '10px' }}
                value={project.description}
                variant="outlined"
                id="standard-multiline-flexible"
                label="Description"
                multiline
                rowsMax="5"
                className={classes.descriptionForm}
                name='description'
                onChange={handleChange}
              />

              <Divider />
              <AddMilestonesForm
                setProject={setProject}
                project={project}
                projectMilestones={projectMilestones}
                milestonesChange={milestonesChange}
                isError={isError}
                setProjectMilestones={setProjectMilestones}
                isEdit
              />
              <Divider />
              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submitButton}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default AddProjectPage;
