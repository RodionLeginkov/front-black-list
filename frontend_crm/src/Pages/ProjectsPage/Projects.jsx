/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ProjectCards from './ProjectsCards.jsx';
import { getProjects } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import getFilteredProjects from '../../Redux/Selectors/ProjectSelectors';
import ProjectsList from './ProjectsList.jsx';

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '13 px',
    minHeight: '40px',
    padding: '0 10px',
  },
  container: {
    paddingLeft: theme.spacing(3),
  },
  tableWrapper: {
    width: '100%',
    margin: '0 auto',
  },
  buttonActive: {
    backgroundColor: '#deedff',
  },
  buttonOf: {
    backgroundColor: '#fff',
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


}));
export default function StickyHeadTable() {
  const classes = useStyles();
  const history = useHistory();
  const [widgetView, setWidgetView] = useState(JSON.parse(localStorage.getItem('projectWidgetView')) || false);
  const dispatch = useDispatch();
  const projects = useSelector((state) => getFilteredProjects(state));
  const [active, setActive] = useState('Active');
  const [activeButton, setActiveButton] = useState('Active');
  // const projects = useSelector((state) => state.projects.filteredProjects)
  const loading = useSelector((state) => state.projects.loadingProjects);
  useEffect(() => {
    dispatch(getProjects(active));
  }, [dispatch, active]);

  const handleChange = () => {
    setWidgetView(!widgetView);
    localStorage.setItem('projectWidgetView', !widgetView);
  };
  console.log(active);

  return (
    <div className={classes.container}>
      <div className={classes.projectsHeader}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h1>Customers</h1>
          <FormControlLabel
            style={{ marginLeft: '10px' }}
            control={<Switch checked={widgetView} onChange={handleChange} color='primary' />}
            label="Widget view"
          />
        </div>
        <ButtonGroup className={classes.buttonGroup} color="primary" aria-label="outlined primary button group">
          <Button
            style={{ width: '102px' }}
            onClick={() => {
              if (active === 'Active') {
                setActive('');
                setActiveButton('');
              } else {
                setActive('Active');
                setActiveButton('Active');
              }
            }}
            className={(activeButton === 'Active') ? classes.buttonActive : classes.buttonOf}
          >
            Active
          </Button>
          <Button
            onClick={() => {
              if (active === 'Archived') {
                setActive('');
                setActiveButton('');
              } else {
                setActive('Archived');
                setActiveButton('Archived');
              }
            }}
            className={(activeButton === 'Archived') ? classes.buttonActive : classes.buttonOf}
          >
            Archived
          </Button>


        </ButtonGroup>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => history.push('/customers/addproject')}
        >
          Add project
        </Button>
      </div>
      {/* <ProjectFilterPanel /> */}
      <div className={classes.tableWrapper}>
        <Grid container>

          {loading ? <CircularProgress style={{ margin: '0 auto' }} />
            : widgetView ? <ProjectCards projects={projects} />
              : <ProjectsList projects={projects} />}
        </Grid>
      </div>
    </div>
  );
}
