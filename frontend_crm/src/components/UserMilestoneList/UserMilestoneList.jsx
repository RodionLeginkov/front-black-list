import React, { useState, useEffect } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import MilestonesTableOnSinglePages from '../MilestonesTableOnSinglePages/MilestonesTableOnSinglePages.jsx';
import SingleUserMilestoneCard from '../SingleUserMilestoneCard/SingleUserMilestoneCard.jsx';
import {
  getUser,
} from '../../Redux/Actions/UsersActions/UserActions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  filterControl: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function UserMilestoneList(props) {
  const {
    user,
    milestones,
    showInfo,
    archived,
    userId,
    subtract,
    setSubtract,
  } = props;


  const classes = useStyles();
  const dispatch = useDispatch();
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [widgetView, setWidgetView] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!userId) {
      dispatch(getUser(user.uuid, ''));
    } else {
      dispatch(getUser(userId, subtract));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId, subtract]);

  const dateSubtract = (e) => {
    if (e.target.value === 0) {
      setSubtract('');
    } else {
      const date = new Date(moment().subtract(e.target.value, 'month')._d);
      setSubtract(date);
    }
  };
  const handleFilterClose = () => {
    setOpen(false);
  };

  const handleFilterOpen = () => {
    setOpen(true);
  };

  const choosenMilestones = milestones.filter((milestone) => (archived ? milestone.status === 'Archived' : milestone.status !== 'Archived'));
  const milestonesCard = widgetView ? choosenMilestones.map((milestone) => (
    <SingleUserMilestoneCard
      showInfo={showInfo}
      addUserModalOpen={addUserModalOpen}
      setAddUserModalOpen={setAddUserModalOpen}
      key={Math.random()}
      milestone={milestone}
      user={user}
    />
  )) : <MilestonesTableOnSinglePages milestones={choosenMilestones} archived={archived} />;


  const handleChangeView = () => {
    setWidgetView(!widgetView);
  };

  if (!choosenMilestones.length) return <Typography>There is no resourses</Typography>;
  return (
    <>
      <div className={classes.filterControl}>
        {!archived ? (
          <FormControlLabel
            style={{ marginLeft: '10px' }}
            control={<Switch checked={widgetView} onChange={handleChangeView} color='primary' />}
            label="Widget view"
          />
        ) : ''}


        {userId ? (

          <FormControl className={classes.formControl}>
            <InputLabel>Periods</InputLabel>
            <Select
              open={open}
              onClose={handleFilterClose}
              onOpen={handleFilterOpen}
                  // value={age}
              onChange={dateSubtract}
            >
              <MenuItem value={0}>
                <em>All</em>
              </MenuItem>
              <MenuItem value={1}>Last month</MenuItem>
              <MenuItem value={3}>Last three mounth</MenuItem>
              <MenuItem value={12}>Last year</MenuItem>
            </Select>
          </FormControl>

        ) : ''}
      </div>
      <Grid container spacing={1} style={{ alignItems: 'center', marginTop: '5px', width: '100%' }}>
        {milestonesCard}
      </Grid>
    </>

  );
}

export default UserMilestoneList;
