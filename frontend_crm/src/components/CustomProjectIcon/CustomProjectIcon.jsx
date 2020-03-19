import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import { getProjects, findProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

const useStyles = makeStyles(() => ({
  avatarGroup: {
    padding: '5px',
  },
  avatar: {
    cursor: 'pointer',
    '&:hover': {
      zIndex: '10 !important',
    },
  },
  skeleton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    background: '#ccc',
  },
}));

const CustomProjectIcon = ({
  projectsIds, addProject,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  useEffect(() => {
    if (!projects.length) dispatch(getProjects());
  });

  const handleClick = (projectId) => {
    dispatch(findProject(projectId));
    history.push(`/projects/${projectId}`);
  };

  const getProject = (projectId) => (
    projects.find((p) => p._id === projectId)
  );

  const projectsList = projectsIds.map((projectId) => {
    const project = getProject(projectId);
    if (!project) return <div className={classes.skeleton} key={Math.random()} />;
    return (
      <Tooltip className={classes.avatar} title={project.name} key={project._id}>
        <Avatar onClick={() => handleClick(project._id)} alt={project.name}>
          {project.name && project.name[0].toUpperCase()}
        </Avatar>
      </Tooltip>
    );
  });

  return (
    <AvatarGroup key={Math.random()} className={classes.avatarGroup} max={4}>
      {projectsList}
      <Tooltip className={classes.avatar} title="Add project">
        <Avatar onClick={addProject} style={{ backgroundColor: '#32418c' }}>+</Avatar>
      </Tooltip>
    </AvatarGroup>
  );
};

CustomProjectIcon.propTypes = {
  projectsIds: PropTypes.array,
  addProject: PropTypes.func,
};

export default CustomProjectIcon;
