import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
  completed: {
    color: '#fff',
  },
  button: {
    minWidth: 0,
    padding: 0,
  },
}));
export default function FadeMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };
  const handleCloselogout = () => {
    setAnchorEl(null);
    localStorage.clear()
    window.location = "/signin";
  };

  return (
    <div>
      <Button className={classes.button} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        <AccountCircleIcon className={classes.completed} />
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleCloselogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}