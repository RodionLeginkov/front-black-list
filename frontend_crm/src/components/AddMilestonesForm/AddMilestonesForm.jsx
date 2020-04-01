import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import { useDispatch } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from 'react-router-dom';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import CustomBadge from '../CustomBadge/CustomBadge.jsx';
import AddUserModal from '../AddUserModal/AddUserModal';
import { useSelector } from 'react-redux';
import { userRoles } from '../../constants/constants'
import CustomBage from '../CustomBadge/CustomBadge.jsx';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuBotton from './MenuBotton.jsx'


const useStyles = makeStyles((theme) => ({
    modal: {
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        maxHeight: '170px',
        width: '100%',
        marginRight: 20,
        marginBottom: 20,
        background: '#F2F2F2',
        color: '#555',
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        },
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'space-between',
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
    cardHeader: {
        marginTop: '5px',
        display: 'flex',
        fontSize: '16px',
        // justifyContent: 'center',
        alignItems: 'center',
    },
}));

function AddMilestonesForm(props) {

    const classes = useStyles();
    const {project, projectMilestones, milestonesChange, isError } = props;
    const [addUserModalOpen, setAddUserModalOpen] = useState(false)
    const [newResValue, setNewResValue] = useState()

    const handleResChange = (e) => setNewResValue(e.target.value)
    const users = useSelector((state) => state.users.users);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleOptions = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleClick = (e) => {
        // if (newResValue) {
        //     e.preventDefault();
        //     resChange(newResValue);
        //     setNewResValue('');
        // }
        setAddUserModalOpen(true)
    }
    const ITEM_HEIGHT = 48;

    const milestones = projectMilestones.map((milestone) => {
        const user = users.find((elem) => elem.uuid === milestone.user_uuid),
            userName = `${user.firstName} ${user.lastName}`,
            role = userRoles.find((item) => item.value === user.role).label,
            start = new Date(milestone.start_date),
            end = new Date(milestone.end_date),
            startDate = `Start: ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`,
            endDate = `End: ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`;


        return (
            <Grid item container key={Math.random()} justify="flex-start" sm={12} md={6} lg={4}>
                <Card className={classes.root}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* <Avatar > user.lastName[0] </Avatar> */}
                        <Typography style={{ marginLeft: '7px' }}>
                            <b>{userName}</b>
                        </Typography>
                        <MenuBotton />
                    </div>
                    <CustomBage
                        text={milestone.role}
                        size="medium"
                        position={user.role}
                        currentProject
                    />
                    <CardContent style={{ padding: '7px' }}>
                        <Typography >
                            {milestone.rate} {milestone.unit}
                        </Typography>
                        <Typography >
                            {startDate}
                        </Typography>
                        <Typography >
                            {endDate}
                        </Typography>
                        {/* <CustomBadge text={`${card.paymentAmount}$ ${card.paymentType}`} theme="price" /> */}
                        {/* {card.duration ? <CustomBadge text={ difDates(startDate, curDate)} theme="duration" style={{ marginTop: '20px' }} /> : ''} */}
                        {/* <CustomBadge text={difDates(startDate, curDate)} theme="duration" style={{ marginTop: '20px' }} /> */}

                        {/* <Typography variant="body2" color="textSecondary" component="p" className={classes.lineClamp5}>
                        {card.description}
                    </Typography> */}
                    </CardContent>
                    {/* </CardActionArea> */}
                </Card>
            </Grid>)
    })

    return (
        <>
            <Grid container spacing={1} style={{ alignItems: 'center', marginTop: '5px' }}>
                {/* <Grid item xs={11}>
                <TextField
                    style={{ width: '100%' }}
                    // value={elem}
                    variant="outlined"
                    // error={project.milestones.length === 0 && isError}
                    // helperText={(!project.status && isError) ? "Empty field." : ''}
                    label="Add new resource"
                    multiline
                    rowsMax="5"
                    name='milestones'
                    onChange={handleResChange}
                    value={newResValue}
                >
                </TextField>

            </Grid> */}
                {milestones}
                <Grid item xs={1}>
                    <Tooltip title="Set user">
                        <IconButton aria-label="delete" onClick={handleClick}>
                            <AddCircleOutlineSharpIcon style={{ fontSize: '30px' }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <AddUserModal
                projectMilestones={projectMilestones}
                addUserModalOpen={addUserModalOpen}
                setAddUserModalOpen={setAddUserModalOpen}
                curProject={project}
                milestonesChange={milestonesChange} />
        </>
    )
}

export default AddMilestonesForm
