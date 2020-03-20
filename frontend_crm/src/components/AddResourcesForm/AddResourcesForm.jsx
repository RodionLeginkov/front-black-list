import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles((theme) => ({
    modal: {
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        width: '100%',
        margin: '0 auto',
        maxWidth: '700px',
    },
    breadcrumbs: {
        margin: '85px 20px 40px 0px',
        color: '#777777',
        cursor: 'pointer',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        padding: '20px 40px',
    },
    content: {
        margin: '0px 20px',
        display: 'flex',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    position: {
        // marginTop: '100px',
        display: 'flex',
        alignItems: 'Center',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '13 px',
    },
    submitButton: {
        width: '30%',
        margin: '20px 0',
    },
    inputForm: {
        width: '100%',
        margin: '5px 0',
    },
    descriptionForm: {
        // margin: '5px 0',
        maxHeight: '200px',
        width: '100%',
    },
    smallForm: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
}));

function AddResourcesForm(props) {


    const { project, resChange, isError } = props;

    const [newResValue, setNewResValue] = useState()

    const handleResChange = (e) => setNewResValue(e.target.value)

    const handleClick = (e) => {
        if (newResValue) {
            e.preventDefault();
            resChange(newResValue);
            setNewResValue('');
        }
    }


    const resources = project.resources.map((elem) =>
        <TextField
            style={{ width: '100%', marginBottom: 10 }}
            value={elem}
            variant="outlined"
            // error={project.resources.length === 0 && isError}
            // helperText={(!project.status && isError) ? "Empty field." : ''}
            label={`Resource №${project.resources.indexOf(elem) + 1}`}
            multiline
            key={elem}
            rowsMax="5"
            name='resources'
        // onChange={handleChange}
        >
        </TextField>
    )

    return (

        <Grid container style={{ alignItems: 'center', marginTop:'5px' }}>
            {resources}
            <Grid item xs={11}>
                <TextField
                    style={{ width: '100%' }}
                    // value={elem}
                    variant="outlined"
                    // error={project.resources.length === 0 && isError}
                    // helperText={(!project.status && isError) ? "Empty field." : ''}
                    label="Add new resource"
                    multiline
                    rowsMax="5"
                    name='resources'
                    onChange={handleResChange}
                    value={newResValue}
                >
                </TextField>

            </Grid>
            <Grid item xs={1}>
                <Tooltip title="Add new resource">
                    <IconButton aria-label="delete" onClick={handleClick}>
                        <AddCircleOutlineSharpIcon style={{ fontSize: '30px' }} />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export default AddResourcesForm
