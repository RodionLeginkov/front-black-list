import React from 'react';
import Grid from '@material-ui/core/Grid';
import SinglProjectCard from '../../components/SingleProjectCard/SingleProjectCard.jsx';
import Loading from '../../components/Loading/index.jsx';

function ProjectsCards(props) {
  const { projects } = props;
  // console.log(projects)

  // if (!projects) return (<Loading />)

  return (
    <>
      {projects.map((card) => (
        <Grid item container key={Math.random()} justify="center" xs={12} sm={6} md={4} lg={4}>
          <SinglProjectCard card={card} />
        </Grid>
      ))}
    </>
  );
}

export default ProjectsCards;
