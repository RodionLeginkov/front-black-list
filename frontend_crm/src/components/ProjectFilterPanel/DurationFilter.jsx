import React from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    formGroup: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: 12,
    },
  }));


function StatusFilter(props) {
    const classes = useStyles();
    const {handleChange , selectedFilters} = props;
    return (
        <>
         <FormGroup className={classes.formGroup}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.React}
                    onChange={handleChange('React')}
                    value='React'
                    color="primary"
                  />
                }
                label="React"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.stopped}
                    onChange={handleChange('stopped')}
                    value='stopped'
                    color="primary"
                  />
                }
                label="Stopped"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.active}
                    onChange={handleChange('active')}
                    value='active'
                    color="primary"
                  />
                }
                label="Active"
              />
                <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.pending}
                    onChange={handleChange('pending')}
                    value='pending'
                    color="primary"
                  />
                }
                label="Pending"
              />
            </FormGroup>   
        </>
    )
}

export default StatusFilter
