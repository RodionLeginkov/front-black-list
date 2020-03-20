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
        width: '400px',
    },
    header: {
        color: '#777',
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
        name: '', status: '', price: '', stack: [], description: '', _id: '', duration: '', developers: [],
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
                            <h2 className={classes.header}>Add user</h2>
                            <DevelopersChooseForm
                                name='developers'
                                developersChange={developersChange}
                                developersValue={project.developers}
                                isEdit />
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
