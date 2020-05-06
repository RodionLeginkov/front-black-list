import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import AddPersonModal from '../AddPersonModal/AddPersonModal.jsx';
import AddUserModal from '../AddUserModal/AddUserModal.jsx';
import CustomBage from '../CustomBadge/CustomBadge.jsx';
import { paymentTypes } from '../../constants/constants';
import SingleMilestoneCard from '../SingleMilestoneCard/SingleMilestoneCard.jsx';
import { getProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import PersonListItem from '../PersonListItem/PersonListItem.jsx';

const PersonsList = (props) => {
  const { projectPersons, projectId } = props;
  const persons = projectPersons ? projectPersons.map((item) => (
    <Grid item container sm={12} spacing={1} key={Math.random()} alignItems="center">
      <PersonListItem
        person={item}
        projectId={projectId}
      />
    </Grid>
  )) : '';
  return (
    <>
      <Grid container spacing={1} style={{ padding: '10px 0px 5px' }}>
        {persons}
      </Grid>
    </>
  );
};

export default PersonsList;
