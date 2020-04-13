import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FileCopySharpIcon from '@material-ui/icons/FileCopySharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { deleteMilestone } from '../../Redux/Actions/MilestonesActions/MilestonesActions';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import AddUserModal from '../AddUserModal/AddUserModal.jsx';

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const {
    project, setProject, milestones, singleMilestone, setProjectMilestones,
  } = props;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = () => {
    setAddUserModalOpen(true);
  };

  const handleDelete = () => {
    // eslint-disable-next-line max-len
    const filteredMilestones = milestones.filter((element) => element.uuid !== singleMilestone.uuid);
    setProject({ ...project, Projects_Milestones: filteredMilestones });
    setProjectMilestones(filteredMilestones);
    dispatch(deleteMilestone(singleMilestone.uuid));
    dispatch(getProject(project.uuid));
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
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
          <MenuItem style={{ padding: '0, 8px' }}>
            <IconButton onClick={handleChange}>
              <EditSharpIcon style={{ fontSize: '20px' }} />
            </IconButton>
          </MenuItem>
          <MenuItem style={{ padding: '0, 8px' }}>
            <IconButton>
              <FileCopySharpIcon style={{ fontSize: '20px' }} />
            </IconButton>
          </MenuItem>
          <MenuItem style={{ padding: '0, 8px' }}>
            <IconButton onClick={handleDelete}>
              <DeleteSharpIcon style={{ fontSize: '20px' }} />
            </IconButton>
          </MenuItem>
        </div>
      </Menu>
      <AddUserModal
        projectMilestones={project.projectMilestones}
        addUserModalOpen={addUserModalOpen}
        setAddUserModalOpen={setAddUserModalOpen}
        curProject={project}
        initialMilestone={singleMilestone}
        // milestonesChange={milestonesChange}
      />
    </div>
  );
}
