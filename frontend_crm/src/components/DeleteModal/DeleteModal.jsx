import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

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

export default function DeleteModal(props) {
    const {
        deleteModalIsOpen, setdeleteModalIsOpen, id, name,
    } = props;
    const classes = useStyles();
    const history = useHistory();   
    const dispatch = useDispatch();

    const handleClose = () => {
        setdeleteModalIsOpen(false);
    };

    function handleDelete() {
        dispatch(deleteProject(id));
        history.push('/projects');
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setdeleteModalIsOpen(false);
    };

    return (
        <div className={classes.position}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={deleteModalIsOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={deleteModalIsOpen}>
                    <div className={clsx(classes.paper, classes.modalWidth)}>
                        <h2 className={classes.header}>Delete project: {name}?</h2>
                        <div className={classes.buttons}>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                className={classes.submitButton}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                className={classes.submitButton}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
