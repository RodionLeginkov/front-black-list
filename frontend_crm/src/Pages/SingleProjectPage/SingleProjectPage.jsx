import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import Divider from '@material-ui/core/Divider';
import CustomBadge from '../../components/CustomBadge/CustomBadge.jsx';
import CustomList from '../../components/CustomList/CustomList.jsx';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { DiReact, DiNodejsSmall } from 'react-icons/di';

const useStyles = makeStyles((theme) => ({
 button: { fontSize: '13 px',
    height: '40px',
    padding: '0 10px',
},
medium: {
  width: '25px',
  height: '25px',
},
}))


function CurrentProject() {
  const history = useHistory();
  const classes = useStyles();
  function handleClick() {
    history.push('/projects');
  }
  const project = useSelector((state) => state.projects.currentProject);
  return (
    <>
    
    
<Paper style={{margin: '0 auto', width:'900px', marginTop:'100px'}}>
  <div style={{marginLeft:'20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      {!project
        ? (<p>Loading....................</p>) : (
          <h1>{project.name}</h1>
        )}
        <div style={{marginRight:'10px'}}>
          <CustomBadge text={project.status} icon={<FiberManualRecordSharpIcon />} status={project.status} size={'large'}/>
        </div>
        </div>
        <Divider />
            <div style={{ margin:'0px 20px', display: 'flex', alignItems:'center'}}>
              <h2>Stack: </h2>
              <div style={{margin: '10px'}}>
                <DiNodejsSmall className={classes.medium} />
                <DiReact className={classes.medium} />
              </div>
            </div>
            <div style={{ margin:'0px 20px',display: 'flex', alignItems:'center'}}>
              <h2>Duration: </h2> 
              <div style={{margin: '10px'}}>
                Some duration
              </div>
            </div>
          <CustomList />
            
        <div style={{margin:'20px', display:'flex'}}>
        <h2 style={{marginTop:0}}>Description: </h2>
        <Typography style={{margin: '13px', paddingBottom:'10px'}}>
            {project.description}
          </Typography>
          </div>
          <Button  onClick={handleClick}>
  Go back
</Button> 
        </Paper>
        
   
    </>
  );
}
export default CurrentProject;
