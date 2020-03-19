
import { createSelector } from 'reselect';

const getUsers = (state) => state.users.users;
const getRoleFilters = (state) => state.users.filters.role;
const getStackFilters = (state) => state.users.filters.stack;
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
  (users, roleFilters) => {
    if (roleFilters.includes('all')) return users;
    return users.filter((user) => (
      user.status && roleFilters.includes(user.status)));
  },
);

const getUsersByStack = createSelector(
  getUsers,
  getStackFilters,
  (users, stackFilters) => {
    if (stackFilters.includes('all')) return users;
    return users.filter((user) => (
      user.stack && user.stack.some((i) => stackFilters.includes(i))));
  },
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
  getUsersByStack,
  getUsersByEmail,
  (users, usersByName, userByRole, userByStack, userByEmail) => users.filter((user) => (
    userByRole.includes(user)
    && userByStack.includes(user)
    // && usersByName.includes(user)
    && userByEmail.includes(user)
  )),
);

export default getFilteredUsers;
