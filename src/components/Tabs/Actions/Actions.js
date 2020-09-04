import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Hidden, MenuList, MenuItem, ListItemIcon, Paper, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles({
  root: {
    right: 0,
    float: 'right'
  },
});

const Actions = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <AddCircleIcon fontSize="large" />
          </ListItemIcon>
          <Typography variant="inherit">Add your Caponord</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Search/edit your submission</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            How does it work?
            </Typography>
        </MenuItem>
      </MenuList>
      <Hidden><div id="tab-motorcycles-submit-modal"></div></Hidden>
      <Hidden><div id="tab-motorcycles-help-modal"></div></Hidden>
    </Paper>
  )
}

Actions.propTypes = {};

Actions.defaultProps = {};

export default Actions;
