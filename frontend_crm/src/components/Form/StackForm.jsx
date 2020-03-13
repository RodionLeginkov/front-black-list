import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
    maxWidth: 700,
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

  { tech: 'React' },
  { tech: 'Node' },
  { tech: 'Express' },
  { tech: 'MongoDb' },
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function StackForm(props) {
  const classes = useStyles();
  const { stackChange, stackValue, isEdit } = props; 
  const [stack, setStack] = useState(isEdit ? stackValue : []);
  const handleChange = (event, values) => {
    setStack(values);
    stackChange(values);
  };
  let filteredTechs = names

  for (const index in stack){
    filteredTechs = filteredTechs.filter((t) => {
      return(
      t.tech !== stack[index].tech)})
  }

  return (
    <div>

      <Autocomplete
      multiple
      className={clsx(classes.formControl, classes.inputForm)}
      id="checkboxes-tags-demo"
      options={filteredTechs}
      disableCloseOnSelect
      getOptionLabel={option => option.tech}
      onChange={handleChange}
      defaultValue={stack}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.tech}
        </React.Fragment>
      )}
      style={{ width: '100%' }}
      renderInput={params => (
          <TextField {...params} variant="outlined" label="Stack" />
        )}
    />
      {/* <FormControl
        label="Stack"
        value={stack}
        variant="outlined"
        className={clsx(classes.formControl, classes.inputForm)}
      >
        <InputLabel id="demo-mutiple-checkbox-label">Stack</InputLabel>
        <Select
        labelWidth={42}
          multiple
          value={stack}
          onChange={handleChange}
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
      </FormControl> */}
    </div>
  );
}
