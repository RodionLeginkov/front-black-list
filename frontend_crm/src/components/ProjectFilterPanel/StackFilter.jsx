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
    const { handleChange, selectedFilters } = props;
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
                            checked={selectedFilters.Express}
                            onChange={handleChange('Express')}
                            value='Express'
                            color="primary"
                        />
                    }
                    label="Express"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedFilters.MongoDb}
                            onChange={handleChange('MongoDb')}
                            value='MongoDb'
                            color="primary"
                        />
                    }
                    label="MongoDb"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedFilters.Node}
                            onChange={handleChange('Node')}
                            value='Node'
                            color="primary"
                        />
                    }
                    label="Node.js"
                />
            </FormGroup>
        </>
    )
}

export default StatusFilter
