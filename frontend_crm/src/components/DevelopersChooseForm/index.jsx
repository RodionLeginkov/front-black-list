import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const useStyles = makeStyles((theme) => ({
  // formControl: {
  //   margin: theme.spacing(1),
  //   // minWidth: 120,
  //   // border:'1px solid'
  // },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  // inputForm: {
  //   paddingRight: '10px'
  // },
}));

export default function DevelopersChooseForm(props) {
  const classes = useStyles();
  const { userChange, developersValue, isError } = props;

  const handleChange = (e, values) => {
    userChange(values);
  };

  const users = useSelector((state) => state.users.users);
  const filteredUsers = users; let
    curUser;
  // for (const index in developersValue) {
  //   filteredUsers = filteredUsers.filter((user) => (
  //     user.lastName !== developersValue[index].lastName));
  // }

  if (developersValue) curUser = filteredUsers.find((item) => item.uuid === developersValue);

  return (
    <>
      <Autocomplete
        options={filteredUsers}
        onChange={handleChange}
        getOptionLabel={(option) => `${option.lastName} ${option.firstName}`}
        value={curUser}
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
      {/* <Autocomplete
      multiple
      className={clsx(classes.formControl, classes.inputForm)}
      id="checkboxes-tags-demo"
      options={filteredUsers}
      disableCloseOnSelect
      getOptionLabel={option => option.fullName}
      onChange={handleChange}
      value={developersValue}
      renderOption={(option, { selected }) => (
        <React.Fragment>

          {option.firstName} {option.lastName}
        </React.Fragment>
      )}
      style={{ width: '100%' }}
      renderInput={params => (
          <TextField error={developersValue.length === 0 && isError} {...params} variant="outlined" label="Developers" />
        )}
      /> */}
    </>
  );
}
