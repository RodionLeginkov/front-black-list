import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions';

export default function DevelopersChooseForm(props) {
  const dispatch = useDispatch();
  const {
    forRead,
    name, userChange, developersValue, isError,
  } = props;

  const handleChange = (e, values) => {
    userChange(values);
  };

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    if (!users.length && !forRead) dispatch(getUsers('', ''));
  });

  const filteredUsers = users; let
    curUser;

  if (developersValue) curUser = filteredUsers.find((item) => item.uuid === developersValue);

  return (
    <>
      <Autocomplete
        options={filteredUsers}
        onChange={handleChange}
        getOptionLabel={(option) => `${option.lastName} ${option.firstName}`}
        value={curUser || null}
        renderInput={(params) => (
          <TextField
            error={!developersValue && isError}
            helperText={!developersValue && isError ? 'Empty field.' : ''}
            {...params}
            label={name}
            variant="outlined"
          />
        )}
      />
    </>
  );
}
