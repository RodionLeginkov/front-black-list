import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const PopUpDeleteUser = ({
  handleClickOnDelete, handleClosePopUp, openPopUp,
}) => (
  <div>
    <Dialog
      open={openPopUp}
      onClose={handleClosePopUp}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Do you really want to delete this user?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClosePopUp} color="primary">
          No
        </Button>
        <Button onClick={handleClickOnDelete} color="secondary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

PopUpDeleteUser.propTypes = {
  handleClickOnDelete: PropTypes.func,
  handleClosePopUp: PropTypes.func,
  openPopUp: PropTypes.bool,
};

export default PopUpDeleteUser;
