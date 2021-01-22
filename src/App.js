import React, { Component } from 'react';

import Searchbar from './components/searchbar';
import ImageGallery from './components/imageGallery';

import './App.css';

class App extends Component {
  state = {
    search: '',
  };

  handleTakeDataFromForm = data => {
    this.setState({
      search: data,
    });
  };

  render() {
    const { search } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleTakeDataFromForm} />,
        <ImageGallery onSearch={search} />
      </>
    );
  }
}

export default App;
