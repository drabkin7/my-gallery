import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


function ResultsPerPage({ changeResults }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleFive = () => {
    changeResults(5);
    setAnchorEl(null);
  };

  const handleTen = () => {
    changeResults(10);
    setAnchorEl(null);
  };

  const handleFifteen = () => {
    changeResults(15);
    setAnchorEl(null);
  };

  const handleAll = () => {
    changeResults(100);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{padding: '5px 40px 5px 5px'}}>
      <Button variant="contained" aria-controls="res-per-page" aria-haspopup="true" onClick={handleClick}>
        Results Per Page
      </Button>
      <Menu
        id="res-per-page"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleFive}>5</MenuItem>
        <MenuItem onClick={handleTen}>10</MenuItem>
        <MenuItem onClick={handleFifteen}>15</MenuItem>
        <MenuItem onClick={handleAll}>All</MenuItem>
      </Menu>
    </div>
  );
}

export default ResultsPerPage;
