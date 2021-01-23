import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { handleFetchApi } from '../../services/pixabayApi';
import ImageGalleryItem from '../imageGalleryItem';
import Button from '../button';
import Modal from '../modal';

import Loader from 'react-loader-spinner';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  static propTypes = {
    onSearch: PropTypes.string,
  };

  state = {
    photos: [],
    search: '',
    page: 1,
    status: Status.IDLE,
    error: null,
    button: false,
    modal: false,
    modalItem: null,
  };

  componentDidMount() {
    this.handleClearPage();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.onSearch;
    const nextSearch = this.props.onSearch;
    const { page } = this.state;

    if (prevSearch !== nextSearch) {
      this.handleClearPage();
      this.setState({
        status: Status.PENDING,
      });

      handleFetchApi(nextSearch, page, this.handleIncrementPage)
        .then(({ hits }) => {
          if (hits.length === 12) {
            this.setState({ button: true });
          }

          this.setState({ photos: hits, status: Status.RESOLVED });
          if (hits.length === 0) {
            return Promise.reject(
              new Error(`At your request  ${nextSearch}   nothing found`),
            );
          }
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
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

  handleLoadMore = () => {
    const nextSearch = this.props.onSearch;
    const { page, photos } = this.state;

    handleFetchApi(nextSearch, page, this.handleIncrementPage)
      .then(({ hits }) => {
        this.setState({ button: true });

        if (hits.length < 12) {
          this.setState({ button: false });
        }
        this.setState({ photos: [...photos, ...hits] });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  handleOpenModal = e => {
    const { photos } = this.state;
    const tags = e.target.attributes.src.value;
    const currentPhoto = photos.find(photo =>
      photo.webformatURL.includes(tags),
    );

    this.setState({ modalItem: currentPhoto });
    this.toggleModal();
  };

  render() {
    const { photos, status, error, button, modal, modalItem } = this.state;

    if (modal) {
      return <Modal onClose={this.toggleModal} modalItem={modalItem} />;
    }

    if (status === 'idle') {
      return null;
    }

    if (status === 'pending') {
      return (
        <Loader
          type="Audio"
          color="#00BFFF"
          height={80}
          width={200}
          timeout={5000}
        />
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.imageGallery} onClick={this.handleOpenModal}>
            {photos.map(ImageGalleryItem)}
          </ul>
          {button && <Button onClick={this.handleLoadMore} />}
        </>
      );
    }

    if (status === 'rejected') {
      return <div className={s.error}>{error.message}</div>;
    }
  }
}

export default ImageGallery;
