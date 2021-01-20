import React, { Component } from 'react';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {};

  state = {
    search: '',
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm}>
          <button type="submit" className={s.buttonForm}>
            <span className={s.labelForm}>Search</span>
          </button>

          <input
            className={s.inputForm}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
