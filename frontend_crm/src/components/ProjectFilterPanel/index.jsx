import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import {
  filteredProjectName
} from '../../Redux/Actions/ProjectsActions/ProjectActions';

const useStyles = makeStyles(theme => ({
  root: {
    // // maxWidth: '1370px',
    marginBottom : 30,
    // marginRight: 20,
    alignItems: 'center',
    maxWidth: '1370px',
    justifyContent: 'space-between',
    // display: 'flex',
    margin: '0 auto',
    // marginTop: '70px',
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
    display: 'flex',
    flexDirection: 'column',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 24px 4px',
  },
  column: {
    flexBasis: '33.33%',
  },
  itemTitle: {
    fontSize: '16px',
    fontWeight: '600',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
  },
  searchField: {
    width: '100%',
  },
}));

export default function DetailedExpansionPanel() {
  const classes = useStyles();
  const [selectedFilters, setSelectedFilters] = useState({
    junior: false,
    middle: false,
    senior: false,
  });
  const [searchName, setSearchName] = useState('');

  const dispatch = useDispatch();

  // const handleChange = useCallback((name) => (event) => {
  //   setSelectedFilters({ ...selectedFilters, [name]: event.target.checked });
  //   const filtersObject = selectedFilters;
  //   if (event.target.checked)
  //     filtersObject[name] = name;
  //   else
  //     filtersObject[name] = event.target.checked;
  //   const filters = Object.keys(filtersObject).map((filter) => {
  //     if (filtersObject[filter])
  //       return filter;
  //   });
  //   dispatch(filteredUserStatus(filters));
  // }, [selectedFilters, setSelectedFilters, dispatch]);

  const onChangeSearchProjectName = (event) => {
    setSearchName(event.target.value);
    dispatch(filteredProjectName(event.target.value));
  };


  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Filters</Typography>
          </div>
        </ExpansionPanelSummary>
        <div className={classes.filtersBlock}>
          <ExpansionPanelDetails className={classes.details}>
            <FormGroup className={classes.formGroup}>
              <TextField
                className={classes.searchField}
                label="Project name"
                variant="outlined"
                value={searchName}
                onChange={onChangeSearchProjectName}
                size='small'
              />
            </FormGroup>
          </ExpansionPanelDetails>
          {/* <ExpansionPanelDetails className={classes.details}>
            <div className={classes.itemTitle}>Job position</div>
            <FormGroup className={classes.formGroup}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.junior}
                    onChange={handleChange('junior')}
                    value='junior'
                    color="primary"
                  />
                }
                label="Junior"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.middle}
                    onChange={handleChange('middle')}
                    value='middle'
                    color="primary"
                  />
                }
                label="Middle"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.senior}
                    onChange={handleChange('senior')}
                    value='senior'
                    color="primary"
                  />
                }
                label="Senior"
              />
            </FormGroup>
          </ExpansionPanelDetails> */}
        </div>
      </ExpansionPanel>
    </div>
  );
}
