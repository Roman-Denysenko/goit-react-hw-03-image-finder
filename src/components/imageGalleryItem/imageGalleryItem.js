import React from 'react';
import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, webformatURL, tags }) => {
  return (
    <li key={id} className={s.ImageGalleryItem}>
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
