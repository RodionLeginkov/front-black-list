import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FileCopySharpIcon from '@material-ui/icons/FileCopySharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { deleteMilestone } from '../../Redux/Actions/MilestonesActions/MilestonesActions'

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const {milestones, singleMilestone, setProjectMilestones } = props;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const filteredMilestones = milestones.filter((element) => element.uuid !== singleMilestone.uuid)
    setProjectMilestones(filteredMilestones)
    dispatch(deleteMilestone(singleMilestone.uuid))
  }

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
      ><div style={{ display: 'flex', flexDirection: 'row' }}>
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
    </div>
  );
}
