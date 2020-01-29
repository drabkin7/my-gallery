import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import DeleteIcon from '@material-ui/icons/Delete';



function ActivePhoto({ url, toOpen, toClose, handleNext, handlePrev, handleDelete }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(toOpen);
  });

  const handleClose = () => {
    toClose();
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="modal-image"
        aria-describedby="modal-of-gallery-photo"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <div style={{ height: '50px', backgroundColor: 'white' }}>
            <IconButton
              aria-label='prev-button'
              onClick={handlePrev}
            >
              <NavigateBeforeIcon />
            </IconButton>
          </div>
          <div style={{ height: '50px', backgroundColor: 'white' }}>
            <IconButton
              aria-label='next-button'
              onClick={handleNext}
            >
              <NavigateNextIcon />
            </IconButton>
          </div>
          <div style={{ height: '50px', backgroundColor: 'white' }}>
            <IconButton
              aria-label='delete-button'
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <img
            src={url}
            alt=''
            onError={(e) => {
              e.target.src = 'https://literalminded.files.wordpress.com/2010/11/image-unavailable1.png'
            }}
          />
        </div>
      </Modal>
    </div>
  );
}


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    display: 'flex',
    flexWrap: 'wrap',
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '51%',
    backgroundColor: 'transparent',
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
}));

export default ActivePhoto;
