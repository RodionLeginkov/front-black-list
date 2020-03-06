import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { filteredUserStatus } from '../../Redux/Actions/UsersActions/UserActions';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  header: {
    width: '100%',
    fontSize: '22px',
    fontWeight: '800',
    padding: '16px',
  },
  itemTitle: {
    fontSize: '18px',
    fontWeight: '600',
    padding: '8px 16px',
  },
  formGroup: {
    marginLeft: '16px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    margin: '16px 0 16px 16px ',
  },
});

export default function TemporaryDrawer({ isShowungPanel, toggleIsShowingPanel }) {
  const classes = useStyles();
  const [selectedFilters, setSelectedFilters] = useState({
    junior: false,
    middle: false,
    senior: false,
  });

  const dispatch = useDispatch();

  const handleChange = (name) => (event) => {
    setSelectedFilters({ ...selectedFilters, [name]: event.target.checked });
  };

  const handleSubmitFilters = () => {
    const fillters = Object.keys(selectedFilters).map((filter) => {
      if (selectedFilters[filter] === true)
        return filter;
    });
    dispatch(filteredUserStatus(fillters));
  }

  const handleResetFilters = () => {
    setSelectedFilters({
      junior: false,
      middle: false,
      senior: false,
    });
    dispatch(filteredUserStatus(['junior', 'middle', 'senior']));
  }

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onKeyDown={toggleIsShowingPanel}
    >
      <div className={classes.header}>
        Filters
      </div>
      <Divider />
      <List>
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
      </List>
      <Divider />
      <div className={classes.row}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={handleSubmitFilters}
        >
          Filter
      </Button>
        <Button
          variant="contained"
          size="large"
          className={classes.button}
          onClick={handleResetFilters}
        >
          Reset
      </Button>
      </div>

    </div>
  );

  return (
    <Drawer anchor="right" open={isShowungPanel} onClose={toggleIsShowingPanel}>
      {sideList()}
    </Drawer>
  );
}
