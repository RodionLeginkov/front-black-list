import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { messengers } from '../../constants/constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
    // border:'1px solid'
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
console.log(messengerValue)
  const handleChange = (event, values) => {
    messengerChange(values);
  };

  let filteredMessenger = messegers
  for (const index in messengerValue) {
    filteredMessenger = filteredMessenger.filter((t) => {
      return (
        t.tech !== messengerValue[index].tech)
    })

  }
  return (
    <div>

      <Autocomplete
        multiple
        className={clsx(classes.formControl, classes.inputForm)}
        id="checkboxes-tags-demo"
        options={filteredMessenger}
        disableCloseOnSelect
        getOptionLabel={option => option.tech}
        onChange={handleChange}
        value={messengerValue}
        renderOption={(option, { selected }) => (
          <React.Fragment>

            {option.tech}
          </React.Fragment>
        )}
        style={{ width: '100%' }}
        renderInput={params => (
          <TextField error={messengerValue.length === 0 && isError} {...params} variant="outlined" label="Messengers" />
        )}
      />
    </div>
  );
}
 // helperText={(!project.status && isError) ? "Empty field." : ''}