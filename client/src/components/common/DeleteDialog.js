import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button} from '@material-ui/core';

const DeleteDialog = ({ openDeleteDialog, handleClose, onDeleteClick }) => {
  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteClick} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;