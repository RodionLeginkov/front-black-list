import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import ProjectCards from './ProjectsCards.jsx';
import ProjectModal from './ProjectsModal.jsx';
import { loadProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

const useStyles = makeStyles({
  button: {
    fontSize: '13 px',
    height: '40px',
    padding: '0 10px'
  },
  container: {
    marginTop: '20px',
    margin: 'auto',
  },
  tableWrapper: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  projectsHeader: {
    alignItems: 'center',
    maxWidth: '1370px',
    justifyContent: 'space-between',
    display: 'flex',
    margin: '0 auto',
    marginTop: '70px',
  },
  h1: {
    fontSize: '40px',
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);

  useEffect(() => {
    dispatch(loadProject());
  }, [dispatch]);

  return (
    <>
      <div className={classes.projectsHeader}>
        <h1>Projects</h1>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => setIsOpen(true)}
        >
          Add project
        </Button>
      </div>
      <div className={classes.tableWrapper}>
        {/* <ProjectList classes={classes} /> */}
        <Grid container spacing={3}>
          <ProjectCards projects={projects} />
        </Grid>
      </div>
      <ProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
