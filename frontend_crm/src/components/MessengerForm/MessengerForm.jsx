import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
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
  inputForm: {
    width: '100%',
    margin: '5px 0px 10px',
  },
}));

const messegers = [
  { tech: 'Slack' },
  { tech: 'Skype' },
  { tech: 'Whatsapp' },
];

export default function MessengerForm(props) {
  const classes = useStyles();
  const { messengerChange, messengerValue, isError } = props;
  const handleChange = (event, values) => {
    messengerChange(values);
  };

  let filteredMessenger = messegers;
  for (const index in messengerValue) {
    filteredMessenger = filteredMessenger.filter((t) => (
      t.tech !== messengerValue[index].tech));
  }
  return (
    <div>

      <Autocomplete
        multiple
        className={clsx(classes.formControl, classes.inputForm)}
        id="checkboxes-tags-demo"
        options={filteredMessenger}
        disableCloseOnSelect
        getOptionLabel={(option) => option.tech}
        onChange={handleChange}
        value={messengerValue}
        renderOption={(option) => (
          <>

            {option.tech}
          </>
        )}
        style={{ width: '100%' }}
        renderInput={(params) => (
          <TextField error={messengerValue.length === 0 && isError} {...params} variant="outlined" label="Messengers" />
        )}
      />
    </div>
  );
}
