import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Sort({ sortByTitle, sortByDate }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleTitle = () => {
    sortByTitle();
    setAnchorEl(null);
  };

  const handleDate = () => {
    sortByDate();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{padding: '5px 40px 5px 5px'}}>
      <Button variant="contained" aria-controls="sort-by" aria-haspopup="true" onClick={handleClick}>
        Sort By
      </Button>
      <Menu
        id="sort-by"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleTitle}>Title</MenuItem>
        <MenuItem onClick={handleDate}>Date</MenuItem>
      </Menu>
    </div>
  );
}

export default Sort;
