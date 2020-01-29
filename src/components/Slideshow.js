import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SlideshowIcon from '@material-ui/icons/Slideshow';


function Slideshow({ handleBegin }) {
  return (
    <div style={{padding: '0px 40px 5px 5px'}}>
      <IconButton
        aria-label="Slideshow"
        onClick={handleBegin}
      >
        <SlideshowIcon />
      </IconButton>
    </div>
  )
}

export default Slideshow;
