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
  filteredUserStatus, filteredUserName, filteredUserEmail, filteredUserPhone,
} from '../../Redux/Actions/UsersActions/UserActions';

const useStyles = makeStyles(() => ({
  root: {
    marginRight: 20,
    marginBottom: 20,
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
  textFields: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  searchField: {
    width: '100%',
    marginRight: 20,
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
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  const dispatch = useDispatch();

  const handleChange = useCallback((name) => (event) => {
    setSelectedFilters({ ...selectedFilters, [name]: event.target.checked });
    const filtersObject = selectedFilters;
    if (event.target.checked) filtersObject[name] = name;
    else filtersObject[name] = event.target.checked;
    const filters = Object.keys(filtersObject).map((filter) => {
      if (filtersObject[filter]) return filter;
    });
    dispatch(filteredUserStatus(filters));
  }, [selectedFilters, setSelectedFilters, dispatch]);

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
            <div className={classes.textFields}>
              <FormGroup className={classes.formGroup}>
                <TextField
                  className={classes.searchField}
                  label="Name"
                  variant="outlined"
                  value={searchName}
                  onChange={onChangeSearchName}
                  size='small'
                />
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <TextField
                  className={classes.searchField}
                  label="Email"
                  variant="outlined"
                  value={searchEmail}
                  onChange={onChangeSearchEmail}
                  size='small'
                />
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <TextField
                  className={classes.searchField}
                  label="Phone number"
                  variant="outlined"
                  value={searchPhone}
                  onChange={onChangeSearchPhone}
                  size='small'
                />
              </FormGroup>
            </div>

          </ExpansionPanelDetails>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.itemTitle}>Job position</div>
            <FormGroup className={classes.formGroup}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={selectedFilters.junior}
                    onChange={handleChange('junior')}
                    value='junior'
                    color="primary"
                  />
                )}
                label="Junior"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={selectedFilters.middle}
                    onChange={handleChange('middle')}
                    value='middle'
                    color="primary"
                  />
                )}
                label="Middle"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={selectedFilters.senior}
                    onChange={handleChange('senior')}
                    value='senior'
                    color="primary"
                  />
                )}
                label="Senior"
              />
            </FormGroup>
          </ExpansionPanelDetails>
        </div>
      </ExpansionPanel>
    </div>
  );
}
