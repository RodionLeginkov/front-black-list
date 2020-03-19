
import { createSelector } from 'reselect';

const getUsers = (state) => state.users.users;
const getRoleFilters = (state) => state.users.filters.role;
const getStackFilters = (state) => state.users.filters.stack;
const getUserName = (state) => state.users.filters.name;
const getUserEmail = (state) => state.users.filters.email;
const getUserPhone = (state) => state.users.filters.phone;
const getUserEnglishLevel = (state) => state.users.filters.englishLevel;

const getUsersByName = createSelector(
  getUsers,
  getUserName,
  (users, userName) => users.filter((user) => (
    user.fullName && user.fullName.toLowerCase().includes(userName.toLowerCase()))),
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

const getUsersByPhone = createSelector(
  getUsers,
  getUserPhone,
  (users, userPhone) => {
    if (!userPhone) return users;
    return users.filter((user) => (
      user.phoneNumber && user.phoneNumber.includes(userPhone)));
  },
);

const getUsersByEnglishLevel = createSelector(
  getUsers,
  getUserEnglishLevel,
  (users, userLevel) => {
    if (userLevel.includes('all')) return users;
    return users.filter((user) => (
      user.englishLevel && userLevel.includes(user.englishLevel)));
  },
);

const getFilteredUsers = createSelector(
  getUsers,
  getUsersByName,
  getUsersByRole,
  getUsersByStack,
  getUsersByEmail,
  getUsersByPhone,
  getUsersByEnglishLevel,
  (users, usersByName, userByRole, userByStack,
    userByEmail, userByPhone, UsersByEnglishLevel) => users.filter((user) => (
    userByRole.includes(user)
    && userByStack.includes(user)
    && usersByName.includes(user)
    && userByEmail.includes(user)
    && userByPhone.includes(user)
    && UsersByEnglishLevel.includes(user)
  )),
);

export default getFilteredUsers;
