import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GamesIcon from '@material-ui/icons/Games';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function DenseAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className="mr-4" color="inherit">
            Squash Players
          </Typography >
          <Link to="/dashboard" className=" ml-2 logo logo-dark">
            <div className="ml-4" >
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <RoomOutlinedIcon fontSize="small" />
                <span className="ml-2" style={{ fontSize: '20px' }}>Vanues</span>
              </IconButton>
            </div>
          </Link>
          <Link to="/game-dashboard" className=" ml-2 logo logo-dark">
            <div className="ml-4" >
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <GamesIcon fontSize="small" />
                <span className="ml-2" style={{ fontSize: '20px' }}>Games</span>
              </IconButton>
            </div>
          </Link>
        </Toolbar>
      </AppBar>
    </div >
  );
}