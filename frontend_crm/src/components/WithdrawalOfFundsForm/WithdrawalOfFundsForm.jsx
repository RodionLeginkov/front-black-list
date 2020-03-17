import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
}));

const names = [

  { type: 'Bank wire' },
  { type: 'PayPal' },
  { type: 'Payoneer' },
];

export default function WithdrawalOfFundsForm(props) {
  const classes = useStyles();
  const { withdrawalOfFundsChange, withdrawalOfFundsValue, isEdit } = props; 
  const [withdrawalOfFunds, setWithdrawalOfFunds] = useState(isEdit ? withdrawalOfFundsValue : []);
  const handleChange = (event, values) => {
    setWithdrawalOfFunds(values);
    withdrawalOfFundsChange(values);
  };
  let filteredTypes = names

  for (const index in withdrawalOfFunds){
    filteredTypes = filteredTypes.filter((t) => {
      return(
      t.type !== withdrawalOfFunds[index].type)})
  }

  return (
    <div>

      <Autocomplete
      multiple
      className={clsx(classes.formControl, classes.inputForm)}
      id="checkboxes-tags-demo"
      options={filteredTypes}
      disableCloseOnSelect
      getOptionLabel={option => option.type}
      onChange={handleChange}
      value={withdrawalOfFunds}
      renderOption={(option, { selected }) => (
        <React.Fragment>
        
          {option.type}
        </React.Fragment>
      )}
      style={{ width: '100%' }}
      renderInput={params => (
          <TextField {...params} variant="outlined" label="withdrawalOfFunds" />
        )}
    />
    </div>
  );
}
