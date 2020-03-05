import React from 'react';
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
import CustomBadge from '../../components/CustomBadge/CustomBadge.jsx';
import CustomList from '../../components/CustomList/CustomList.jsx';
import StackIcon from '../../components/StackIcon/StackIcon.jsx';
import { deleteProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

const useStyles = makeStyles(() => ({
  footerIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteButton: {

  }
}));

function CurrentProject() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const project = useSelector((state) => state.projects.currentProject);
  function handleClick() {
    history.push('/projects');
  }

  function handleDelete() {
    dispatch(deleteProject(project._id));
    history.push('/projects');
  }

  const stackList = project.stack.map((elem) => (
    <StackIcon key={Math.random()} tech={elem} size='medium' />
  ));

  return (
    <>
      <Paper style={{ margin: '0 auto', width: '900px', marginTop: '100px' }}>
        <div style={{
          marginLeft: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
        >
          {!project
            ? (<p>Loading....................</p>) : (
              <h1>{project.name}</h1>
            )}
          <div style={{ marginRight: '10px' }}>
            <CustomBadge text={project.status} icon={<FiberManualRecordSharpIcon />} status={project.status} size="large" />
          </div>
        </div>
        <Divider />
        <div style={{ margin: '0px 20px', display: 'flex', alignItems: 'center' }}>
          <h2>Stack: </h2>
          <div style={{ margin: '10px', display: 'flex' }}>
            {stackList}
          </div>
        </div>
        <div style={{ margin: '0px 20px', display: 'flex', alignItems: 'center' }}>
          <h2>Duration: </h2>
          <div style={{ margin: '10px' }}>
            Some duration
          </div>
        </div>
        <CustomList />

        <div style={{ margin: '20px', display: 'flex' }}>
          <h2 style={{ marginTop: 0 }}>Description: </h2>
          <Typography style={{ margin: '13px', paddingBottom: '10px' }}>
            {project.description}
          </Typography>
        </div>
        <Divider />
        <div className={classes.footerIcons}>
          <Button onClick={handleClick}>
            <ArrowBackIosIcon />
          </Button>
          <Button onClick={handleDelete} className={classes.deleteButton}>
            <DeleteOutlineIcon />
          </Button>
        </div>
      </Paper>


    </>
  );
}
export default CurrentProject;
