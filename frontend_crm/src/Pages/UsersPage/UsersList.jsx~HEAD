import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '../../components/UserCard/UserCard.jsx';

function HomeUsersList(props) {
  const { users } = props;


  return (
    <>
      {users.map((user) => (
        <Grid item container justify="flex-start" key={Math.random()} xs={12} sm={6} md={4} lg={3}>
          <Card
            imgUrl="https://themicon.co/theme/centric/v2.0/static-html5/src/images/04.jpg"
            userId={user._id}
            userName={user.login}
            userEmail={user.email}
            userPosition={user.status}
          />
        </Grid>
      ))}
    </>
  );
}

export default HomeUsersList;
