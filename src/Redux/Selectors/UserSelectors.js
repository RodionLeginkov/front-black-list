
import { createSelector } from 'reselect';

const getUsers = (state) => state.users.users;
const getUserName = (state) => state.users.filters.name;

const getUsersByName = createSelector(
  getUsers,
  getUserName,
  (users, userName) => users.filter((user) => (
    user.fullName && user.fullName.toLowerCase().includes(userName.toLowerCase()))),
);

// Example
// const getUsersByRole = createSelector(
//   getUsers,
//   getRoleFilters,
//   (users, roleFilters) => {
//     if (roleFilters.includes('all')) return users;
//     return users.filter((user) => (
//       user.status && roleFilters.includes(user.status)));
//   },
// );


const getFilteredUsers = createSelector(
  getUsers,
  getUsersByName,

  (users, usersByName) => users.filter((user) => (usersByName.includes(user)
  )),
);
export default getFilteredUsers;
