import React from 'react';
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
  inputForm: {
    width: '100%',
    margin: '10px 0',
  },
}));

const names = [
  { tech: 'Angular' },
  { tech: 'AWS' },
  { tech: 'GraphQl' },
  { tech: 'PostgresQl' },
  { tech: 'React' },
  { tech: 'Node' },
  { tech: 'Express' },
  { tech: 'MongoDb' },
];

export default function StackForm(props) {
  const classes = useStyles();
  const { stackChange, stackValue } = props;
  const handleChange = (event, values) => {
    stackChange(values);
  };
  let filteredTechs = names;

  for (const index in stackValue) {
    filteredTechs = filteredTechs.filter((t) => (
      t.tech !== stackValue[index].tech));
  }

  return (
    <div>

      <Autocomplete
        multiple
        className={clsx(classes.formControl, classes.inputForm)}
        id="checkboxes-tags-demo"
        options={filteredTechs}
        disableCloseOnSelect
        getOptionLabel={(option) => option.tech}
        onChange={handleChange}
        value={stackValue}
        renderOption={(option, { selected }) => (
          <>
            {option.tech}
          </>
        )}
        style={{ width: '100%' }}

        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Stack" />
        )}
      />
    </div>
  );
}
