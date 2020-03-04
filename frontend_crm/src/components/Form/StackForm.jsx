import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
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

const names = [
  { tech: 'React.js' },
  { tech: 'Node.js' },
  { tech: 'Express.js' },
  { tech: 'MongoDb' },
];

export default function StackForm({name, stackChange}) {
  const classes = useStyles();
  const [stack, setStack] = React.useState([]);

  const handleChange = (event) => {
    setStack(event.target.value);
    stackChange(event.target.value);
  };

  return (
    <div>

      <FormControl variant="outlined" className={clsx(classes.formControl, classes.inputForm)}>
        <InputLabel id="demo-mutiple-checkbox-label">Stack</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={stack}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name.tech} value={name.tech}>
              <Checkbox checked={stack.indexOf(name.tech) > -1} />
              <ListItemText primary={name.tech} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
}
