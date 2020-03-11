import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
    margin: '5px 0',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function StackForm(props) {
  const classes = useStyles();
  const { developersChange, developersValue, isEdit } = props;
  const [developers, setDeveopers] = useState(isEdit ? developersValue : []);

  const handleChange = (event) => {
    setDeveopers(event.target.value);
    developersChange(event.target.value);
  };

  const  users = useSelector((state) => state.users.users)
  console.log(users[0].login)

  return (
    <div>

      <FormControl
        label="Developers"
        value={developers}
        variant="outlined"
        className={clsx(classes.formControl, classes.inputForm)}
      >
        <InputLabel id="demo-mutiple-checkbox-label">Developers</InputLabel>
        <Select
        labelWidth={83}
          multiple
          value={developers}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {users.map((user) => (
            <MenuItem key={Math.random()} value={user.login}>
              <Checkbox checked={developers.indexOf(user.login) > -1} />
              <ListItemText primary={user.login} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
}
