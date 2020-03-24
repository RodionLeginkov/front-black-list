import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import UserCard from '../../components/UserCard/UserCard.jsx';

const UsersList = ({ users }) => (
  <>
    {users.map((user) => (

      <Grid item container justify="flex-start" key={Math.random()} xs={12} sm={6} md={4} lg={3} xl={2}>
        <UserCard user={user} />

      </Grid>
    ))}
  </>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.object,
    ]),
  ),
};
UsersList.defaultProps = {
  users: [],
};


export default UsersList;
