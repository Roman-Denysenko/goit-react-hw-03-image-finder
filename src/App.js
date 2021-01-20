import React, { Component } from 'react';

import Searchbar from './components/searchbar';
import './App.css';

class App extends Component {
  state = {
    search: '',
  };

  render() {
    return <Searchbar />;
  }
}

export default App;
