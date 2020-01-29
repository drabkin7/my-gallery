import React, { Component } from 'react';
import Grid from './components/Grid';
import ActivePhoto from './components/ActivePhoto';
import SearchBox from './components/SearchBox';
import Pagination from './components/Pagination';
import Sort from './components/Sort';
import Slideshow from './components/Slideshow';
import ResultsPerPage from './components/ResultsPerPage';

import localStorage from '../node_modules/local-storage';


class MyGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: props.feed,
      manipulated: localStorage.get('photos') || [...this.props.feed],
      currentPhoto: 0,
      isModalOpen: false,
      slideInterval: null,
      currentPage: 1,
      resPerPage: props.resultsPerPage || 10,
    }
    this.search = props.search;
    this.pagination = props.pagination;
    this.sorting = props.sorting;
    this.autoRotateTime = props.autoRotateTime;

    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePrevButton = this.handlePrevButton.bind(this);
    this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
  }

  componentDidMount() {
    this.setState({ manipulated: localStorage.get('photos') || [...this.state.feed] });
  }

  sortByTitle = () => {
    let sorted = [...this.state.feed];
    let temp = sorted[0].title;
    for (let i = 0; i < sorted.length; i++) {
      for (let j = 0; j < sorted.length; j++) {
        if(sorted[i].title[0].toLowerCase() < sorted[j].title[0].toLowerCase()) {
          temp = sorted[i];
          sorted[i] = sorted[j];
          sorted[j] = temp;
        }
      }
    }
    this.setState({manipulated: sorted});
  }

  sortByDate = () => {
    let sorted = [...this.state.feed];
    let temp = sorted[0].date;
    for (let i = 0; i < sorted.length; i++) {
      for (let j = 0; j < sorted.length; j++) {
        if (parseInt(sorted[i].date.slice(12, 16)) < parseInt(sorted[j].date.slice(12, 16))) {
          temp = sorted[i];
          sorted[i] = sorted[j];
          sorted[j] = temp;
        }
        else if (parseInt(sorted[i].date.slice(12, 16)) === parseInt(sorted[j].date.slice(12, 16))) {
          let months = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8,
            'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12};
          if (months[sorted[i].date.slice(8, 11)] < months[sorted[j].date.slice(8, 11)]) {
            temp = sorted[i];
            sorted[i] = sorted[j];
            sorted[j] = temp;
          }
          else if (months[sorted[i].date.slice(8, 11)] === months[sorted[j].date.slice(8, 11)]) {
            if (parseInt(sorted[i].date.slice(5, 7)) < parseInt(sorted[j].date.slice(5, 7))) {
              temp = sorted[i];
              sorted[i] = sorted[j];
              sorted[j] = temp;
            }
          }
        }
      }
    }
    this.setState({manipulated: sorted});
  }

  handleSearch = (e) => {
    let currentFeed = [];
    let filtered = [];
    if(e.target.value !== "") {
      currentFeed = [...this.state.feed];
      filtered = currentFeed.filter(item => {
        return item.title.toLowerCase().includes(e.target.value.toLowerCase());
      });
    }
    else {
      filtered = [...this.state.feed];
    }
    this.setState({manipulated: filtered});
  }

  handleOpenModal = (e) => {
    let findPhoto = (element) => element.title === e.target.alt;
    let photoToOpen = this.state.manipulated.findIndex(findPhoto);
    this.setState({ currentPhoto: photoToOpen, isModalOpen: true });
  }

  handleCloseModal = () => {
    clearInterval(this.state.slideInterval);
    this.setState({ currentPhoto: 0, isModalOpen: false });
  }

  handleNextButton = () => {
    let nextPhoto = this.state.currentPhoto < this.state.currentPage * this.state.resPerPage - 1 ?
      parseInt(this.state.currentPhoto) + 1 :
      this.state.currentPage * this.state.resPerPage - this.state.resPerPage;
    this.setState({ currentPhoto: nextPhoto });
  };

  handlePrevButton = () => {
    let prevPhoto = this.state.currentPhoto > this.state.currentPage * this.state.resPerPage - this.state.resPerPage ?
      parseInt(this.state.currentPhoto) - 1 : this.state.currentPage * this.state.resPerPage - 1;
    this.setState({ currentPhoto: prevPhoto });
  };

  handleDeletePhoto = () => {
    let newFeed = this.state.manipulated.filter(item =>
      item.url !== this.state.manipulated[this.state.currentPhoto].url);
    this.setState({ manipulated: newFeed });
    localStorage.set('photos', newFeed);
  };

  handleSlideshow = () => {
    let slideshow = setInterval(() => {
      this.setState({ currentPhoto: (parseInt(this.state.currentPhoto) + 1) })
    }, (parseInt(this.autoRotateTime) * 1000));
    this.setState({ isModalOpen: true, slideInterval: slideshow });
  }

  handleResultsPerPage = (number) => {
    this.setState({ resPerPage: number })
  }

  getCurrentResults = () => {
    const indexOfLastResult = parseInt(this.state.currentPage) * parseInt(this.state.resPerPage);
    const indexOfFirstResult = indexOfLastResult - this.state.resPerPage;
    const currentResults = this.state.manipulated.slice(indexOfFirstResult, indexOfLastResult);
    return (currentResults);
  }

  paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

  render() {

    let search = this.search ? <SearchBox handleSearch={this.handleSearch} /> : null;
    let pages = this.pagination ? <Pagination
     resultsPerPage={this.state.resPerPage}
     totalResults={this.state.manipulated.length}
     paginate={this.paginate} /> : null;
    let sorting = this.sorting ? <Sort sortByTitle={this.sortByTitle} sortByDate={this.sortByDate} /> : null;


    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <ResultsPerPage changeResults={this.handleResultsPerPage} />
        {search}
        {sorting}
        <Slideshow handleBegin={this.handleSlideshow} />
        <Grid
          thumbnails={this.getCurrentResults()}
          handlePhotoClick={this.handleOpenModal}
        />
        <ActivePhoto
          url={this.state.manipulated[this.state.currentPhoto].url}
          toOpen={this.state.isModalOpen}
          toClose={this.handleCloseModal}
          handleNext={this.handleNextButton}
          handlePrev={this.handlePrevButton}
          handleDelete={this.handleDeletePhoto}
        />
        {pages}
      </div>
    );
  }
}

MyGallery.defaultProps = {
  search: true,
  pagination: true,
  resPerPage: 10,
  sorting: true,
  autoRotateTime: 4
}

export default MyGallery;
