import React from 'react';
import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIndSharpIcon from '@material-ui/icons/AssignmentIndSharp';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import AccessAlarmSharpIcon from '@material-ui/icons/AccessAlarmSharp';
import FadeMenu from '../ProfileButton/ProfileButton.jsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  iconGroup: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
  },
  topProfileIcons: {
    padding: '4px 8px',
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar

        color="primary"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar display="flex">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ cursor: 'pointer' }} onClick={() => history.push('/')} variant="h6" noWrap>
            Exceed
          </Typography>
          <div className={classes.iconGroup}>
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              className={clsx(classes.topProfileIcons)}
            >
              <EmailIcon />
            </IconButton> */}
            {/* <IconButton
              color="inherit"
              className={clsx(classes.topProfileIcons)}
            >
              <NotificationsIcon />
            </IconButton> */}
            <FadeMenu className={classes.topProfileIcons} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        style={{ display: { xs: 'none', sm: 'block' } }}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" className={classes.link}>
            <Tooltip title='Home'>
              <ListItem button key="Home" color="red[500]">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Tooltip>
          </Link>

          <Link to="/users" className={classes.link}>
            <Tooltip title='Users'>
              <ListItem button key="Users">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </Tooltip>
          </Link>

          <Link to="/projects" className={classes.link}>
            <Tooltip title='Projects'>
              <ListItem button key="Projects">
                <ListItemIcon>
                  <DeveloperBoardIcon />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItem>
            </Tooltip>
          </Link>
          <Link to="/leads" className={classes.link}>
            <Tooltip title='Leads'>
              <ListItem button key="Leads">
                <ListItemIcon>
                  <AssignmentIndSharpIcon />
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItem>
            </Tooltip>
          </Link>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
