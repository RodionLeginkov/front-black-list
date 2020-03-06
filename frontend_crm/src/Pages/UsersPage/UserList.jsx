import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '../../components/Card/Card.jsx';

function HomeUsersList(props) {
  const { users } = props;


  return (
    <>
      {users.map((user) => (
        <Grid item container justify="center" key={Math.random()} xs={10} sm={5} lg={3}>
          <Card
            imgUrl="https://themicon.co/theme/centric/v2.0/static-html5/src/images/04.jpg"
            userId={user._id}
            userName={user.login}
            userEmail={user.email}
            userRole={user.isAdmin}
          />
        </Grid>
      ))}
    </>
  );
}

export default HomeUsersList;
