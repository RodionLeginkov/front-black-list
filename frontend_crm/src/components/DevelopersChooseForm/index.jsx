import React, { useState } from 'react';
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
  const { developersChange, developersValue } = props;

  const handleChange = (event, values) => {
    developersChange(values);
  };

  const  users = useSelector((state) => state.users.users)
  let filteredUsers = users;
  for (const index in developersValue){
    filteredUsers = filteredUsers.filter((user) => {
      return(
      user.login !== developersValue[index].login)})
  }
  return (
    <div>
    <Autocomplete
      multiple
      className={clsx(classes.formControl, classes.inputForm)}
      id="checkboxes-tags-demo"
      options={filteredUsers}
      disableCloseOnSelect
      getOptionLabel={option => option.login}
      onChange={handleChange}
      value={developersValue}
      renderOption={(option, { selected }) => (
        <React.Fragment>
    
          {option.login}
        </React.Fragment>
      )}
      style={{ width: '100%' }}
      renderInput={params => (
          <TextField {...params} variant="outlined" label="Developers" />
        )}
    />
    </div>
  );
}
