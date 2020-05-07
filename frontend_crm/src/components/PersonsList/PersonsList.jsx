import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import PersonListItem from '../PersonListItem/PersonListItem.jsx';

const PersonsList = (props) => {
  const {
    projectPersons,
    projectId,
    personDelete,
    personChange,
  } = props;
  const persons = projectPersons ? projectPersons.map((item) => (
    <Grid item container sm={12} spacing={1} key={Math.random()} alignItems="center">
      <PersonListItem
        person={item}
        projectId={projectId}
        personChange={personChange}
        personDelete={personDelete}
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
