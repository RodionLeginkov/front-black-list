import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import { findProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

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
  milestones, addProject, edit,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.projects)

  const handleClick = (projectId) => {
    dispatch(findProject(projectId));
    history.push(`/projects/${projectId}`);
  };

  const projectsList = milestones.map((milestone) => {
    const project = projects.find((project) => project.uuid === milestone.project_uuid);
    if (!project) return <div className={classes.skeleton} key={Math.random()} />;
    return (
      // <Tooltip className={classes.avatar} title={project.name} key={project.uuid}>
      //   <Avatar onClick={() => handleClick(project.uuid)} alt={project.name}>
      //     {project.name && project.name[0].toUpperCase()}
      //   </Avatar>
      // </Tooltip>

        <Tooltip className={classes.avatar} title={project.name} key={Math.random()}>
          <Avatar 
          onClick={() => handleClick(milestone.project_uuid)}
           alt={project.name} 
           src={`${milestone.userImage}`} />
        </Tooltip>
    );
  });

  return (
    <AvatarGroup key={Math.random()} className={classes.avatarGroup} max={4}>
      {projectsList}
      {/* {edit && (
      <Tooltip className={classes.avatar} title="Add project">
        <Avatar onClick={addProject} style={{ backgroundColor: '#32418c' }}>+</Avatar>
      </Tooltip>
      )} */}
    </AvatarGroup>
  );
};

CustomProjectIcon.propTypes = {
  projects: PropTypes.array,
  addProject: PropTypes.func,
  edit: PropTypes.bool,
};

export default CustomProjectIcon;
