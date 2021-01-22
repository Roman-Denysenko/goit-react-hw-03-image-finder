import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { handleFetchApi } from '../../services/pixabayApi';
import ImageGalleryItem from '../imageGalleryItem';

import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  static propTypes = {
    onSearch: PropTypes.string,
  };

  state = {
    photos: [],
    search: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.onSearch;
    const nextSearch = this.props.onSearch;
    const { page } = this.state;

    if (prevSearch !== nextSearch) {
      handleFetchApi(nextSearch, page, this.handleIncrementPage)
        .then(data => {
          this.setState({ photos: data.hits });
        })
        .catch(error => this.setState({ error }));
    }
  }

  handleIncrementPage = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  handleClearPage = () => {
    this.setState({
      page: 1,
    });
  };

  render() {
    const { photos } = this.state;

    return <ul className={s.imageGallery}>{photos.map(ImageGalleryItem)}</ul>;
  }
}

export default ImageGallery;
