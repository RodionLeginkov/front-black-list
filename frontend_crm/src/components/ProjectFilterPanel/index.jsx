// import React, { useState, useCallback } from 'react';
// import { useDispatch } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import FormGroup from '@material-ui/core/FormGroup';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import TextField from '@material-ui/core/TextField';
// import {

//   filteredProjectName, filteredProjects

// } from '../../Redux/Actions/ProjectsActions/ProjectActions';
// import StatusFilter from './StatusFilter.jsx';
// import StackFilter from './StackFilter.jsx';
// import DurationFilter from './DurationFilter.jsx'

// const useStyles = makeStyles((theme) => ({
//   root: {

//     marginBottom: 30,

//     alignItems: 'center',
//     maxWidth: '1370px',
//     justifyContent: 'space-between',
//     margin: '0 auto',
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: '800',
//   },
//   icon: {
//     verticalAlign: 'bottom',
//     height: 20,
//     width: 20,
//   },
//   filtersBlock: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   details: {
//     display: 'flex',
//     flexDirection: 'column',
//     padding: '8px 24px 4px',
//   },
//   column: {
//     flexBasis: '33.33%',
//   },
//   itemTitle: {
//     fontSize: '16px',
//     fontWeight: '600',
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'row',
//     fontSize: 12,
//   },
//   searchField: {
//     width: '100%',
//   },
// }));

// export default function DetailedExpansionPanel() {
//   const classes = useStyles();
//   const [selectedFilters, setSelectedFilters] = useState({
//     onGoing: false,
//     stopped: false,
//     active: false,
//     completed: false,
//     pending: false,
//     Express: false,
//     Angular: false,
//     AWS: false,
//     GraphQl: false,
//     PostgresQl: false,
//     React: false,
//     MongoDb: false,
//     Node: false,
//     '1-3 months': false,
//     '3-6 months':false,
//     '6-12 months': false,
//     Unexpected: false,
//   });
//   const [searchName, setSearchName] = useState('');

//   const dispatch = useDispatch();

//   const handleChange = useCallback((name) => (event) => {
//     setSelectedFilters({ ...selectedFilters, [name]: event.target.checked });
//     const filtersObject = selectedFilters;

//     if (event.target.checked)
//       filtersObject[name] = name;
//     else
//       filtersObject[name] = event.target.checked;
//     const filters = Object.keys(filtersObject).filter((filter) => {
//       return filtersObject[filter];
//     });
//     dispatch(filteredProjects(filters));

//   }, [selectedFilters, setSelectedFilters, dispatch]);

//   const onChangeSearchProjectName = (event) => {
//     setSearchName(event.target.value);
//     dispatch(filteredProjectName(event.target.value));
//   };


//   return (
//     <div className={classes.root}>
//       <ExpansionPanel >
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1c-content"
//           id="panel1c-header"
//         >
//           <div className={classes.column}>
//             <Typography className={classes.heading}>Filters</Typography>
//           </div>
//         </ExpansionPanelSummary>
//         <div className={classes.filtersBlock}>
//           <ExpansionPanelDetails className={classes.details}>
//             <FormGroup className={classes.formGroup}>
//               <TextField
//                 className={classes.searchField}
//                 label="Project name"
//                 variant="outlined"
//                 value={searchName}
//                 onChange={onChangeSearchProjectName}
//                 size='small'
//               />
//             </FormGroup>
//           </ExpansionPanelDetails>
//           <ExpansionPanelDetails className={classes.details}>
//             <div className={classes.itemTitle}>Project status</div>

//             <StatusFilter handleChange={handleChange} selectedFilters={selectedFilters} />
//           </ExpansionPanelDetails>

//           <ExpansionPanelDetails className={classes.details}>
//             <div className={classes.itemTitle}>Stack</div>
//             <StackFilter handleChange={handleChange} selectedFilters={selectedFilters} />
//           </ExpansionPanelDetails>

//           <ExpansionPanelDetails className={classes.details}>
//             <div className={classes.itemTitle}>Duration</div>
//             <DurationFilter handleChange={handleChange} selectedFilters={selectedFilters} />
//           </ExpansionPanelDetails>
//         </div>
//       </ExpansionPanel>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import {
  filteredProjectName,
  filteredProjectStack,
  filteredProjectStatus,
  filteredProjectDuration,
  filteredProjectPaymentType,
  filteredProjectMessenger,
  filteredProjectCommunication,
} from '../../Redux/Actions/ProjectsActions/ProjectActions';
import {
  stackList,
  projectsStatus,
  projectsDuration,
  paymentTypes,
  messengers,
  projectFormatOfCommunication,
} from '../../constants/constants';

const useStyles = makeStyles(() => ({
  root: {
    marginRight: 20,
    marginBottom: 20,
  },
  panel: {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    },
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  filtersBlock: {
    maxWidth: 800,
    padding: '0 20px 20px 20px',
  },
  searchField: {
    width: '100%',
  },
}));

const FilterUserPanel = () => {
  const classes = useStyles();
  const [searchName, setSearchName] = useState('');

  const dispatch = useDispatch();

  const handleChangeStack = ((event, values) => {
    dispatch(filteredProjectStack(values));
  });

  const handleChangeStatus = ((event, values) => {
    dispatch(filteredProjectStatus(values));
  });

  const handleChangeDuration = ((event, values) => {
    dispatch(filteredProjectDuration(values));
  });

  const handleChangePaymentType = ((event, values) => {
    dispatch(filteredProjectPaymentType(values))
  })

  const handleChangeMessengers = ((event, values) => {
    dispatch(filteredProjectMessenger(values))
  })

  const handleChangeFormatOfCommunication = ((event, values) => {
    dispatch(filteredProjectCommunication(values))
  })

  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
    dispatch(filteredProjectName(event.target.value));
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Typography className={classes.heading}>Filters</Typography>
        </ExpansionPanelSummary>
        <Grid spacing={2} container justify="space-between" className={classes.filtersBlock}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={searchName}
              onChange={onChangeSearchName}
              size='small'
              className={classes.searchField}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              options={stackList}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={handleChangeStack}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Stack"
                />
              )}
              size="small"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              options={projectsStatus}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={handleChangeStatus}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Status"
                />
              )}
              size="small"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              options={projectsDuration}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={handleChangeDuration}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Duration"
                />
              )}
              size="small"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              options={paymentTypes}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={handleChangePaymentType}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Payment type"
                />
              )}
              size="small"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              options={messengers}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={handleChangeMessengers}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Messengers"
                />
              )}
              size="small"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              multiple
              options={projectFormatOfCommunication}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={handleChangeFormatOfCommunication}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Format of communication"
                />
              )}
              size="small"
            />
          </Grid>
        </Grid>
      </ExpansionPanel>
    </div>
  );
};

export default FilterUserPanel;
