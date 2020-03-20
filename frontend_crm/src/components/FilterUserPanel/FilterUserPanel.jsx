import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import {
  filteredUserRole, filteredUserName, filteredUserEmail, filteredUserPhone,
  filteredUserStack, filteredUserEnglishLevel,
} from '../../Redux/Actions/UsersActions/UserActions';
import { userRoles, stackList, englishLevels } from '../../constants/constants';

const useStyles = makeStyles(() => ({
  root: {
    marginRight: 20,
    marginBottom: 20,
  },
  panel: {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    },
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  filtersBlock: {
    maxWidth: 800,
    padding: '0 20px 20px 20px',
  },
  searchField: {
    width: '100%',
  },
}));

const FilterUserPanel = () => {
  const classes = useStyles();
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  const dispatch = useDispatch();

  const handleChangeRole = ((event, values) => {
    dispatch(filteredUserRole(values));
  });

  const handleChangeStack = ((event, values) => {
    dispatch(filteredUserStack(values));
  });

  const handleChangeEnglishLevel = ((event, values) => {
    dispatch(filteredUserEnglishLevel(values));
  });

  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
    dispatch(filteredUserName(event.target.value));
  };

  const onChangeSearchEmail = (event) => {
    setSearchEmail(event.target.value);
    dispatch(filteredUserEmail(event.target.value));
  };

  const onChangeSearchPhone = (event) => {
    setSearchPhone(event.target.value);
    dispatch(filteredUserPhone(event.target.value));
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Typography className={classes.heading}>Filters</Typography>
        </ExpansionPanelSummary>
        <Grid spacing={2} container justify="space-between" className={classes.filtersBlock}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Name"
              variant="outlined"
              value={searchName}
              onChange={onChangeSearchName}
              size='small'
              className={classes.searchField}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              variant="outlined"
              value={searchEmail}
              onChange={onChangeSearchEmail}
              size='small'
              className={classes.searchField}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone number"
              variant="outlined"
              value={searchPhone}
              onChange={onChangeSearchPhone}
              size='small'
              className={classes.searchField}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              options={userRoles}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={handleChangeRole}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Job position"
                />
              )}
              size="small"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              options={stackList}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={handleChangeStack}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Stack"
                />
              )}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={englishLevels}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={handleChangeEnglishLevel}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="English Level"
                />
              )}
              size="small"
            />
          </Grid>
        </Grid>
      </ExpansionPanel>
    </div>
  );
};

export default FilterUserPanel;
