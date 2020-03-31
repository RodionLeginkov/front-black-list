import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import DevelopersChooseForm from '../DevelopersChooseForm';
import { updateProjectDevelopers } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { userRoles, englishLevels, stackList } from '../../constants/constants';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    modal: {
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        padding: '20px 40px',
    },
    position: {
        display: 'flex',
        alignItems: 'Center',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '13 px',
    },
    submitButton: {
        marginTop: '20px',
    },
    modalWidth: {
        width: '600px',
    },
    header: {
        color: '#777',
    },
    inputForm: {
        width: '100%',
        marginTop: '10px',
        marginBottom: '0px',
        paddingBottom: '0px',
    },
}));

export default function AddUserModal(props) {
    const {
        addUserModalOpen, setAddUserModalOpen, curProject, isEdit,
    } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleClose = () => {
        setAddUserModalOpen(false);
    };
    const initialValue = isEdit ? curProject : {
        name: '', status: '', price: '', stack: [], description: '', uuid: '', duration: '', developers: [],
    };

    const [project, setProject] = useState(initialValue);

    const handleCancel = (e) => {
        e.preventDefault();
        setProject(initialValue)
        setAddUserModalOpen(false);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (isEdit) dispatch(updateProjectDevelopers(project));
        setProject(initialValue);
        setAddUserModalOpen(false);
    };
    const developersChange = (developers) => setProject({ ...project, developers });


    // const startDateChange = (hiredAt) => setUser({ ...user, hiredAt });

    // const endDateChange = (dataofLeave) => setUser({ ...user, dataofLeave });

    return (
        <div className={classes.position}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={addUserModalOpen}
                onClose={handleCancel}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addUserModalOpen}>
                    <div className={clsx(classes.paper, classes.modalWidth)}>
                        <form className={classes.root} noValidate autoComplete="off" >
                            <h2 className={classes.header}>{project.name}</h2>
                            <DevelopersChooseForm
                                name='developers'
                                developersChange={developersChange}
                                developersValue={project.Users}
                                isEdit />
                            <Grid container spacing={1}>
                                <Grid item item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                                    <FormControl
                                        placeholder='Role'
                                        variant="outlined"
                                        className={clsx(classes.formControl, classes.inputForm)}

                                    >
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            labelWidth={47}
                                            name='role'
                                        // onChange={handleChange}
                                        >
                                            {userRoles.map((role) => <MenuItem value={role.value} key={role.label}>{role.label}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item item xs={12} sm={6} style={{ paddingBottom: 0 }}>
                                    <TextField
                                        label="Load"
                                        variant="outlined"
                                        inputProps={{ 'aria-label': 'description' }}
                                        className={classes.inputForm}
                                        name='lastName'
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                  hr/day
                                                </InputAdornment>,

                                        }}
                                    />
                                </Grid>
                                <Grid item item xs={12} sm={6} style={{ paddingTop: 0 }}>
                                    <TextField
                                        label="Rate"
                                        variant="outlined"
                                        inputProps={{ 'aria-label': 'description' }}
                                        className={classes.inputForm}
                                        name='lastName'
                                    // onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item item xs={12} sm={6} style={{ paddingTop: 0 }}>
                                    <TextField
                                        label="Unit"
                                        variant="outlined"
                                        inputProps={{ 'aria-label': 'description' }}
                                        className={classes.inputForm}
                                        name='lastName'
                                    // onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <KeyboardDatePicker
                                    className={clsx(classes.formControl, classes.inputForm)}
                                    style={{ width: '100%' }}
                                    inputVariant="outlined"
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    label="Start Date"
                                    // onChange={startDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />

                                <KeyboardDatePicker
                                    style={{ width: '100%' }}
                                    inputVariant="outlined"
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    label="End date"
                                    className={clsx(classes.formControl, classes.inputForm)}
                                    // onChange={endDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />

                            </MuiPickersUtilsProvider>
                            <div className={classes.buttons}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={handleAdd}
                                    className={classes.submitButton}
                                >
                                    Add
                            </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className={classes.submitButton}
                                    onClick={handleCancel}
                                >
                                    Cancel
                            </Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
