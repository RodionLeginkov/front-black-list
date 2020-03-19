import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  filteredUserRole, filteredUserName, filteredUserEmail, filteredUserPhone,
  filteredUserStack,
} from '../../Redux/Actions/UsersActions/UserActions';
import { userRoles, stackList } from '../../constants/constants';

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
    flexWrap: 'wrap',
    width: '100%',
  },
  searchField: {
    width: '100%',
    marginRight: 20,
    marginBottom: 10,
  },
  filter: {
    width: '100%',
    maxWidth: 727,
    minHeight: 40,
    marginRight: 20,
    marginBottom: 10,
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
            <FormGroup className={classes.formGroup}>
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
                className={classes.filter}
                size="small"
              />
            </FormGroup>
            <FormGroup className={classes.formGroup}>
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
                className={classes.filter}
                size="small"
              />
            </FormGroup>
          </ExpansionPanelDetails>
        </div>
      </ExpansionPanel>
    </div>
  );
};

export default FilterUserPanel;
