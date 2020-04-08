import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  button: {
    fontSize: '13 px',
    minHeight: '40px',
    padding: '0 10px',
  },
  container: {
    paddingLeft: '100px',

  },
  tableWrapper: {
    width: '100%',
    margin: '0 auto',
  },
  projectsHeader: {
    alignItems: 'center',
    marginRight: '20px',
    justifyContent: 'space-between',
    display: 'flex',
    margin: '0',
    marginTop: 70,
  },
  h1: {
    fontSize: '40px',
  },
});
export default function StickyHeadTable() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.projectsHeader}>
        <h1>Leads</h1>

      </div>
    </div>
  );
}
