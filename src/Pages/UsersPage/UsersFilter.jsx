import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardSharpIcon from '@material-ui/icons/ArrowUpwardSharp';
import ArrowDownwardSharpIcon from '@material-ui/icons/ArrowDownwardSharp';
import './UserFilter.css';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  roots: {
    marginRight: 20,
    marginBottom: '10px',
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
    maxWidth: '100%',
    padding: '0 20px 20px 20px',
    display: 'flex',
    flexFlow: 'no-wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  searchField: {
    width: '250px',
  },
  button: {
    backgroundColor: '#deedff',
  },
  buttonOf: {
    backgroundColor: '#fff',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    flexDerection: 'row',
  },
  order: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '-5px',
  },
  orderIcon: {
    marginTop: '5px',
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  buttonGroup: {
    margin: '0px 10px',
  },
}));

const UsersFilter = (props) => {
  const classes = useStyles();
  const {
    filterRole, setFilterRole, filterBar, setFilterBar, sort,
    setSort, open, setOpen, order, setOrder, selectButton, setSelectButton,
    profitable, setProfitable, profitButton, setProfitButton, active, setActive,
    activeButton, setActiveButton,
  } = props;

  // const dispatch = useDispatch();
  // const [filter, setFilter] = useState('');
  // const [filterRole, setFilterRole] = useState('');
  // const [filterBar, setFilterBar] = useState('');
  // const [sort, setSort] = useState('');
  // const [open, setOpen] = useState(false);
  // const [order, setOrder] = useState(true);
  // useEffect(() => {
  //   dispatch(getUsers(filterRole, filterBar, sort, order));
  // }, [dispatch, filterRole, filterBar, sort, order]);
  //   const [searchName, setSearchName] = useState('');
  const handleChangeName = (e) => {
    e.preventDefault();
    setFilterBar(e.target.value);
  };
  // //////

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  //   const handleChangeStatus = ((event, values) => {
  //     dispatch(filteredProjectStatus(values));
  //   });


  //   const onChangeSearchName = (event) => {
  //     setSearchName(event.target.value);
  //     dispatch(filteredProjectName(event.target.value));
  // };

  return (
    <div className={classes.roots}>
      {/* <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"

        /> */}
      <Grid spacing={2} container className={classes.filtersBlock}>

        <Grid item style={{ padding: 0 }}>
          <TextField

            label="Search by Name or Surname"
            variant="outlined"
            value={filterBar}
            onChange={handleChangeName}
            size='small'
            className={classes.searchField}
          />
        </Grid>
        <div className={classes.root}>
          <ButtonGroup className={classes.buttonGroup} color="primary" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                if (filterRole === 'Developers') {
                  setFilterRole('');
                  setSelectButton('');
                } else {
                  setFilterRole('Developers');
                  setSelectButton('Developers');
                }
              }}
              className={(selectButton === 'Developers') ? classes.button : classes.buttonOf}
            >
              Developers
            </Button>
            <Button
              onClick={() => {
                if (filterRole === 'manager') {
                  setFilterRole('');
                  setSelectButton('');
                } else {
                  setFilterRole('manager');
                  setSelectButton('manager');
                }
              }}
              className={(selectButton === 'manager') ? classes.button : classes.buttonOf}
            >
              Managers
            </Button>
            <Button
              onClick={() => {
                setFilterRole('');
                setSelectButton('');
              }}
              className={(selectButton === '') ? classes.button : classes.buttonOf}
            >
              All Roles
            </Button>

          </ButtonGroup>
          <ButtonGroup className={classes.buttonGroup} color="primary" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                if (profitable === 'Profitable') {
                  setProfitable('');
                  setProfitButton('');
                  setFilterRole('');
                  setSelectButton('');
                } else {
                  setProfitable('Profitable');
                  setProfitButton('Profitable');
                  setFilterRole('Developers');
                  setSelectButton('Developers');
                }
              }}
              className={(profitButton === 'Profitable') ? classes.button : classes.buttonOf}
            >
              Profitable
            </Button>
            <Button
              onClick={() => {
                if (profitable === 'No Profitable') {
                  setProfitable('');
                  setProfitButton('');
                } else {
                  setProfitable('No Profitable');
                  setProfitButton('No Profitable');
                }
              }}
              className={(profitButton === 'No Profitable') ? classes.button : classes.buttonOf}
            >
              Not Profitable
            </Button>
          </ButtonGroup>
          <ButtonGroup className={classes.buttonGroup} color="primary" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                if (active === 'Active') {
                  setActive('');
                  setActiveButton('');
                } else {
                  setActive('Active');
                  setActiveButton('Active');
                }
              }}
              className={(activeButton === 'Active') ? classes.button : classes.buttonOf}
            >
              Active
            </Button>
            <Button
              onClick={() => {
                if (active === 'Archived') {
                  setActive('');
                  setActiveButton('');
                } else {
                  setActive('Archived');
                  setActiveButton('Archived');
                }
              }}
              className={(activeButton === 'Archived') ? classes.button : classes.buttonOf}
            >
              Archived
            </Button>


          </ButtonGroup>
        </div>

        <Grid className={classes.order}>
          <Grid item>
            {order
              ? (
                <IconButton
                  className={classes.orderIcon}
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={() => {
                    setOrder(!order);
                  // dispatch(getUsers(filter,sort));
                  }}
                >
                  <ArrowUpwardSharpIcon />
                </IconButton>
              )
              : (
                <IconButton
                  className={classes.orderIcon}
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={() => {
                    setOrder(!order);
                  // dispatch(getUsers(filter,sort));
                  }}
                >
                  <ArrowDownwardSharpIcon />
                </IconButton>
              )}
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl} size='small' style={{ margin: 0 }}>

              <InputLabel id="demo-controlled-open-select-label">Order</InputLabel>
              <Select

                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={sort}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Name">Name</MenuItem>
                <MenuItem value="Senioiry">Seniority</MenuItem>
                <MenuItem value="Role">Role</MenuItem>
                <MenuItem value="Loads">Total Load</MenuItem>
                <MenuItem value="current_task">Current Task</MenuItem>
                <MenuItem value="project_ready">Project Ready</MenuItem>
                <MenuItem value="english_skill">English Skill</MenuItem>
                <MenuItem value="current_project">Current Project</MenuItem>
                <MenuItem value="role_in_project">Role in the project</MenuItem>
                <MenuItem value='load'>Load (h/week)</MenuItem>
                <MenuItem value='current_rate'>Current rate</MenuItem>
              </Select>
            </FormControl>

          </Grid>
        </Grid>

        {/* <Grid item xs={12} lg={6}>
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
          </Grid> */}
        {/* <Grid item xs={12} lg={6}>
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
          </Grid> */}
      </Grid>
      {/* </ExpansionPanel> */}
    </div>
  );
};

export default UsersFilter;
