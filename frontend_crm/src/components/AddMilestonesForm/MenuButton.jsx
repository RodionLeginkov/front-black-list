import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FileCopySharpIcon from '@material-ui/icons/FileCopySharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import UnarchiveSharpIcon from '@material-ui/icons/UnarchiveSharp';
import Tooltip from '@material-ui/core/Tooltip';
import { deleteMilestone } from '../../Redux/Actions/MilestonesActions/MilestonesActions';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import AddNewMilestoneModal from '../AddNewMilestoneModal/AddNewMilestoneModal.jsx';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));


const ITEM_HEIGHT = 48;
export default function LongMenu(props) {
  const {
    project,
    setProject,
    milestones,
    singleMilestone,
    setProjectMilestones,
    isExpired,
  } = props;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [archive, setArchive] = useState(false);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleArchive = (e) => {
    e.stopPropagation();
    setAddUserModalOpen(true);
    setArchive(true);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  const handleChange = (e) => {
    e.stopPropagation();
    setAddUserModalOpen(true);
  };
  const handleDelete = () => {
    // eslint-disable-next-line max-len
    const filteredMilestones = milestones.filter((element) => element.uuid !== singleMilestone.uuid);
    setProject({ ...project, ProjectMilestones: filteredMilestones });
    setProjectMilestones(filteredMilestones);
    dispatch(deleteMilestone(singleMilestone.uuid));
    dispatch(getProject(project.uuid));
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
          {isExpired
            ? (
              <Tooltip title="Archive milestone">
                <MenuItem style={{ padding: '0, 8px' }}>
                  <IconButton onClick={handleArchive}>
                    <UnarchiveSharpIcon style={{ fontSize: '20px' }} />
                  </IconButton>
                </MenuItem>
              </Tooltip>
            ) : ''}
          <MenuItem style={{ padding: '0, 8px' }}>
            <IconButton>
              <FileCopySharpIcon style={{ fontSize: '20px' }} />
            </IconButton>
          </MenuItem>
          <Tooltip title="Delete milestone">
            <MenuItem style={{ padding: '0, 8px' }}>
              <IconButton onClick={handleDelete}>
                <DeleteSharpIcon style={{ fontSize: '20px' }} />
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
        // milestonesChange={milestonesChange}
      />
    </div>
  );
}
