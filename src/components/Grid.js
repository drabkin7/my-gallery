import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';



function Grid({ thumbnails, handlePhotoClick }) {

  const classes = useStyles;
  return (
    <div className={classes.root} style={{padding: '0px 5px'}}>
      <GridList cellHeight={160} className={classes.gridList} cols={5}>
        {thumbnails.map((tile, i) => (
          <GridListTile
            key={tile.url}
            cols={tile.cols || 1}
          >
            <img
              src={tile.url}
              alt={tile.title}
              onClick={handlePhotoClick}
              index={i}
              style={{cursor: 'pointer'}}
              onError={(e) => {
                e.target.src = 'https://literalminded.files.wordpress.com/2010/11/image-unavailable1.png'
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));


export default Grid;
