import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FileCopySharpIcon from '@material-ui/icons/FileCopySharp';
import Autorenew from '@material-ui/icons/Autorenew';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import UnarchiveSharpIcon from '@material-ui/icons/UnarchiveSharp';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { getProject, getProjects } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { deleteMilestone, updateMilestone } from '../../Redux/Actions/MilestonesActions/MilestonesActions';
import AddNewMilestoneModal from '../AddNewMilestoneModal/AddNewMilestoneModal.jsx';
import AddNewDeathRattleModal from '../AddNewDeathRattleModal/AddNewDeathRattleModal.jsx';

const ITEM_HEIGHT = 48;
export default function MenuButton(props) {
  const {
    project,
    setProject,
    milestones,
    singleMilestone,
    setProjectMilestones,
    isExpired,
    projectId,
    milestoneEdit,
    newProjectId,
    projectView,
  } = props;

  const promoteMilestone = {
    user_uuid: singleMilestone.user_uuid,
    project_uuid: project.uuid,
    person_uuid: null,
    role: '',
    rate: null,
    rate_type: '',
    load: null,
    start_date: singleMilestone.start_date,
    end_date: null,
    Users: singleMilestone.Users,
    platform: '',
    withdraw: '',
    comment: '',
    status: 'Active',
  };
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deathRattleModelOpen, setDeathRattleModelOpen] = useState(false);
  const [archive, setArchive] = useState(false);
  const [promote, setPromote] = useState(false);
  const [popconfirm, setPopconfirm] = React.useState(null);
  const pop = Boolean(popconfirm);

  const handlePopOpen = (event) => {
    setPopconfirm(popconfirm ? null : event.currentTarget);
  };

  const handlePopClose = () => {
    setPopconfirm(null);
  };

  const id = pop ? 'simple-popper' : undefined;

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleArchive = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    setDeathRattleModelOpen(true);
    setArchive(true);
    // e.stopPropagation();
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  const handleChange = (e) => {
    e.stopPropagation();
    setAddUserModalOpen(true);
  };
  const handlePromote = (e) => {
    e.stopPropagation();
    setPromote(true);
    setAddUserModalOpen(true);
  };
  const handleDelete = () => {
    // eslint-disable-next-line max-len
    if (projectView) {
      dispatch(deleteMilestone(singleMilestone.uuid));
      dispatch(getProject(project.uuid));
    } else {
      const filteredMilestones = milestones.filter((element) => element.uuid !== singleMilestone.uuid);
      setProject({ ...project, ProjectMilestones: filteredMilestones });
      setProjectMilestones(filteredMilestones);
      dispatch(deleteMilestone(singleMilestone.uuid));
    }
    // dispatch(getProject(project.uuid));
  };

  return (
    <div>
      <Tooltip title="More info">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            background: '#F2F2F2',
            maxHeight: ITEM_HEIGHT * 4.5,
            paddingBottom: '0px',
          },
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Tooltip title="Edit milestone">
            <MenuItem style={{ padding: '0, 8px' }}>
              <IconButton onClick={handleChange}>
                <EditSharpIcon style={{ fontSize: '20px' }} />
              </IconButton>
            </MenuItem>
          </Tooltip>

          <Tooltip title="Archive milestone">
            <MenuItem style={{ padding: '0, 8px' }}>
              <IconButton onClick={handleArchive}>
                <UnarchiveSharpIcon style={{ fontSize: '20px' }} />
              </IconButton>
            </MenuItem>
          </Tooltip>

          <MenuItem style={{ padding: '0, 8px' }}>
            <IconButton>
              <FileCopySharpIcon style={{ fontSize: '20px' }} />
            </IconButton>
          </MenuItem>

          <MenuItem style={{ padding: '0, 8px' }}>
            <IconButton onClick={handlePopOpen}>
              <DeleteSharpIcon style={{ fontSize: '20px' }} />
              <Popover
                id={id}
                open={pop}
                anchorEl={popconfirm}
                onClose={handlePopClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box style={{ wordWrap: 'break-word', textAlign: 'center', width: 300 }} p={1}>
                  <p>
                    Are you sure to delete milestone for project
                    {' '}
                    {project.name}
                    {' '}
                    ?
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDelete}
                      style={{ width: 80 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handlePopClose}
                      style={{ width: 80 }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Box>
              </Popover>
            </IconButton>
          </MenuItem>
          <Tooltip title='Promoute'>
            <MenuItem style={{ padding: '0, 8px' }}>
              <IconButton onClick={handlePromote}>
                <Autorenew style={{ fontSize: '20px' }} />
              </IconButton>
            </MenuItem>
          </Tooltip>

        </div>
      </Menu>
      <AddNewMilestoneModal
        projectMilestones={project.projectMilestones}
        addUserModalOpen={addUserModalOpen}
        setAddUserModalOpen={setAddUserModalOpen}
        curProject={project}
        initialMilestone={singleMilestone}
        isExpired={isExpired}
        archive={archive}
        setArchive={setArchive}
        projectId={projectId}
        newProjectId={newProjectId}
        milestoneEdit={milestoneEdit}
        // milestonesChange={milestonesChange}
      />
      {projectView ? (
        <AddNewMilestoneModal
          projectMilestones={project.projectMilestones}
          addUserModalOpen={addUserModalOpen}
          setAddUserModalOpen={setAddUserModalOpen}
          curProject={project}
          initialMilestone={singleMilestone}
          isExpired={isExpired}
          archive={archive}
          setArchive={setArchive}
          projectId={projectId}
          newProjectId={newProjectId}
          milestoneEdit={milestoneEdit}
          projectView
        />
      ) : ''}
      {promote ? (
        <AddNewMilestoneModal
          projectMilestones={project.projectMilestones}
          addUserModalOpen={addUserModalOpen}
          setAddUserModalOpen={setAddUserModalOpen}
          curProject={project}
          initialMilestone={singleMilestone}
          isExpired={isExpired}
          archive={archive}
          setArchive={setArchive}
          projectId={projectId}
          newProjectId={newProjectId}
          milestoneEdit={milestoneEdit}
          promoteMilestone={promoteMilestone}
          promote={promote}
          setPromote={setPromote}
        />
      ) : ''}
      {(promote && projectView) ? (
        <AddNewMilestoneModal
          projectMilestones={project.projectMilestones}
          addUserModalOpen={addUserModalOpen}
          setAddUserModalOpen={setAddUserModalOpen}
          curProject={project}
          initialMilestone={singleMilestone}
          isExpired={isExpired}
          archive={archive}
          setArchive={setArchive}
          projectId={projectId}
          newProjectId={newProjectId}
          milestoneEdit={milestoneEdit}
          promoteMilestone={promoteMilestone}
          promote={promote}
          setPromote={setPromote}
          projectView
        />
      ) : '' }
      <AddNewDeathRattleModal
        projectMilestones={project.projectMilestones}
        curProject={project}
        initialMilestone={singleMilestone}
        isExpired={isExpired}
        archive={archive}
        setArchive={setArchive}
        deathRattleModelOpen={deathRattleModelOpen}
        setDeathRattleModelOpen={setDeathRattleModelOpen}
      />
    </div>
  );
}
