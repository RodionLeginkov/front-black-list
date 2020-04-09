import React from 'react';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function DevelopersChooseForm(props) {
  const { userChange, developersValue, isError } = props;
  const handleChange = (e, values) => {
    userChange(values);
  };

  const users = useSelector((state) => state.users.users);
  let filteredUsers = users;
  for (const index in developersValue) {
    filteredUsers = filteredUsers.filter((user) => (user.lastName !== developersValue[index].lastName));
  }

  return (
    <>
      <Autocomplete
        options={filteredUsers}
        onChange={handleChange}
        getOptionLabel={(option) => `${option.lastName} ${option.firstName}`}
        renderInput={(params) => (
          <TextField
            error={!developersValue && isError}
            helperText={!developersValue && isError ? 'Empty field.' : ''}
            {...params}
            label="User"
            variant="outlined"
          />
        )}
      />
    </>
  );
}
