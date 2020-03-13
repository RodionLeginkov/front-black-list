
import { createSelector } from 'reselect';

const getUsers = (state) => state.users.users;
const getRoleFilters = (state) => state.users.filters.role;
const getUserName = (state) => state.users.filters.name;
const getUserEmail = (state) => state.users.filters.email;


const getUsersByName = createSelector(
  getUsers,
  getUserName,
  (users, userName) => users.filter((user) => (
    user.name && user.name.toLowerCase().includes(userName.toLowerCase()))),
);

const getUsersByRole = createSelector(
  getUsers,
  getRoleFilters,
  (users, roleFilters) => users.filter((user) => (
    user.role && roleFilters.includes(user.role))),
);

const getUsersByEmail = createSelector(
  getUsers,
  getUserEmail,
  (users, userEmail) => users.filter((user) => (
    user.email && user.email.toLowerCase().includes(userEmail.toLowerCase()))),
);


const getFilteredUsers = createSelector(
  getUsers,
  getUsersByName,
  getUsersByRole,
  getUsersByEmail,
  (users, usersByName, userByRole, userByEmail) => users.filter((user) => (
    userByRole.includes(user)
    && usersByName.includes(user)
    && userByEmail.includes(user)
  )),
);

export default getFilteredUsers;
