import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';

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

const UsersFilter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [page] = useState();
  useEffect(() => {
    dispatch(getUsers(filter,page));
  }, [dispatch],filter);
//   const [searchName, setSearchName] = useState('');

const handleChangeName = (e) => {
  e.preventDefault();
  console.log(e.target.value)
    setFilter(e.target.value)
    console.log("filter",filter)
    dispatch(getUsers(e.target.value));
};
//   const handleChangeStatus = ((event, values) => {
//     dispatch(filteredProjectStatus(values));
//   });


//   const onChangeSearchName = (event) => {
//     setSearchName(event.target.value);
//     dispatch(filteredProjectName(event.target.value));
  // };

  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Typography className={classes.heading}>Search</Typography>
        </ExpansionPanelSummary>
        <Grid spacing={2} container justify="space-between" className={classes.filtersBlock}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Name or Surname"
              variant="outlined"
              value={filter}
              onChange={handleChangeName}
              // onChange={(e) => {
              //   //console.log(e.target.value)
              //   setFilter(e.target.value)
              //   dispatch(getUsers(filter,page));
              // }}
              size='small'
              className={classes.searchField}
            />
          </Grid>
          {/* <Grid item xs={12} lg={6}>
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
          </Grid> */}
          {/* <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              options={projectsStatus}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={handleChangeStatus}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Status"
                />
              )}
              size="small"
            />
          </Grid> */}
        </Grid>
      </ExpansionPanel>
    </div>
  );
};

export default UsersFilter;
