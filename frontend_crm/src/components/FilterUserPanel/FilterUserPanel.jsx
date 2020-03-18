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
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import {
  filteredUserStatus, filteredUserName, filteredUserEmail, filteredUserPhone,
} from '../../Redux/Actions/UsersActions/UserActions';
import { userRoles } from '../../constants/constants';

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
  select: {
    minWidth: 229,
    minHeight: 40,
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    '&:before': {
      borderBottom: '0',
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  selectedRole: {
    fontWeight: 600,
  },
  notSelectedRole: {
    fontWeight: 400,
  },
}));

const FilterUserPanel = () => {
  const classes = useStyles();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  const dispatch = useDispatch();

  const handleChange = ((event) => {
    setSelectedFilters(event.target.value);
    dispatch(filteredUserStatus(event.target.value));
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(role, selectedRoles) {
    return (selectedRoles.includes(role)
      ? classes.selectedRole
      : classes.notSelectedRole);
  }

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
              <Select
                className={classes.select}
                multiple
                value={selectedFilters}
                onChange={handleChange}
                variant="outlined"
                size='small'
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {userRoles.map((role) => (
                  <MenuItem
                    key={role}
                    value={role}
                    className={getStyles(role, selectedFilters)}
                  >
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormGroup>
          </ExpansionPanelDetails>
        </div>
      </ExpansionPanel>
    </div>
  );
};

export default FilterUserPanel;
