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
                    checked={selectedFilters['1-3 months']}
                    onChange={handleChange('1-3 months')}
                    value='1-3 months'
                    color="primary"
                  />
                }
                label="1-3 months"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters['3-6 months']}
                    onChange={handleChange('3-6 months')}
                    value='3-6 months'
                    color="primary"
                  />
                }
                label="3-6 months"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters['6-12 months']}
                    onChange={handleChange('6-12 months')}
                    value='6-12 months'
                    color="primary"
                  />
                }
                label="6-12 months"
              />
                <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.Unexpected}
                    onChange={handleChange('Unexpected')}
                    value='Unexpected'
                    color="primary"
                  />
                }
                label="Unexpected"
              />
            </FormGroup>   
        </>
    )
}

export default StatusFilter
