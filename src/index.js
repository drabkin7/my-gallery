import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyGallery from './App';
import data from './feed.json';


ReactDOM.render(<MyGallery feed={data} />, document.getElementById('root'));
