import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Express from '../../Assets/devIcons/Express.svg';
import AWS from '../../Assets/devIcons/AWS.svg';
import PostgresQl from '../../Assets/devIcons/PostgresQl.svg';
import Angular from '../../Assets/devIcons/Angular.svg';
import ReactDev from '../../Assets/devIcons/ReactDev.svg';
import Node from '../../Assets/devIcons/Node.svg';
import MongoDb from '../../Assets/devIcons/MongoDb.svg';
import GraphQl from '../../Assets/devIcons/GraphQl.svg';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles(() => ({

  tiny: {
    height: '10px',
    width: '10px',
    padding: '1px 2px',
  },
  small: {
    height: '20px',
    width: '20px',
    padding: '3px 6px',
  },

  medium: {
    height: '25px',
    width: '25px',
    padding: '4px 10px',
  },

  large: {
    height: '30px',
    width: '30px',
    padding: '5px 12px',
  },
  icon: {
    backgroundRepeat: 'no-repeat !important',
    backgroundSize: 'contain !important',
  }
}));
const icons = [
  GraphQl,
  PostgresQl,
  Express,
  ReactDev,
  MongoDb,
  Angular,
  AWS,
  Node,
];

function StackIcon(props) {
  const classes = useStyles();
  const {
    size, tech, className,
  } = props;

  const iconClassName = clsx(classes.icon, {
    [classes.small]: size === 'small',
    [classes.medium]: size === 'medium',
    [classes.large]: size === 'large',
  }, className);

  const findedIcon = icons.find((elem) => elem.includes(tech));
  return (
    <Tooltip title={tech}>
      <div className={iconClassName} style={{ background: `url(${findedIcon})` }} />
    </Tooltip>
  );
}

export default StackIcon;
