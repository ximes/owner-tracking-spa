import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Hidden, MenuList, MenuItem, ListItemIcon, Paper, Typography } from '@material-ui/core';
import FormModal from '../../FormModal/FormModal'
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  root: {
  },
});

const Actions = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <FormModal icon={<AddIcon />} text="Add your Caponord" primary />
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FormModal icon={<SearchIcon />} text="Your submission" />
          </ListItemIcon>
        </MenuItem>
      </MenuList>
      <Hidden><div id="tab-motorcycles-help-modal"></div></Hidden>
    </Paper>
  )
}

Actions.propTypes = {};

Actions.defaultProps = {};

export default Actions;
