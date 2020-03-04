import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '../../components/Card/Card.jsx';

function HomeUsersList(props) {
  const { users } = props;
  return (
    <>
      {users.map(user => (
        <Grid item container justify="center" key={user} xs={12} sm={6} lg={4}>
          <Card imgUrl="https://themicon.co/theme/centric/v2.0/static-html5/src/images/04.jpg" />
        </Grid>
      ))}
    </>
  );
}

export default HomeUsersList;
