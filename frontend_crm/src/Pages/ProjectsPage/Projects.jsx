import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ProjectCards from './ProjectsCards.jsx';
import ProjectModal from './ProjectsModal.jsx';
import { getProjects } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';
import ProjectFilterPanel from '../../components/ProjectFilterPanel/index.jsx';
import getFilteredProjects from '../../Redux/Selectors/ProjectSelectors';
import ProjectsList from './ProjectsList.jsx';

const useStyles = makeStyles({
  button: {
    fontSize: '13 px',
    minHeight: '40px',
    padding: '0 10px',
  },
  container: {
    paddingLeft: '100px',
  },
  tableWrapper: {
    width: '100%',
    margin: '0 auto',
  },
  projectsHeader: {
    alignItems: 'center',
    marginRight: '20px',
    justifyContent: 'space-between',
    display: 'flex',
    margin: '0',
    marginTop: 70,
  },
  h1: {
    fontSize: '40px',
  },

});
export default function StickyHeadTable() {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [widgetView, setWidgetView] = useState(JSON.parse(localStorage.getItem('projectWidgetView')) || false);
  const dispatch = useDispatch();
  const projects = useSelector((state) => getFilteredProjects(state));
  // const projects = useSelector((state) => state.projects.filteredProjects)
  const loading = useSelector((state) => state.projects.loadingProjects);
  useEffect(() => {
    dispatch(getProjects());
    dispatch(getUsers());
  }, [dispatch]);

  const handleChange = () => {
    setWidgetView(!widgetView);
    localStorage.setItem('projectWidgetView', !widgetView);
  };
  
  return (
    <div className={classes.container}>
      <div className={classes.projectsHeader}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h1>Projects</h1>
          <FormControlLabel
            style={{ marginLeft: '10px' }}
            control={<Switch checked={widgetView} onChange={handleChange} color='primary' />}
            label="Widget view"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => history.push('/projects/addproject')}
        >
          Add project
        </Button>
      </div>
      <ProjectFilterPanel />
      <div className={classes.tableWrapper}>
        <Grid container>

          {loading ? <CircularProgress style={{ margin: '0 auto' }} />
            : widgetView ? <ProjectCards projects={projects} />
              : <ProjectsList projects={projects} />}
        </Grid>
      </div>
      <ProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
