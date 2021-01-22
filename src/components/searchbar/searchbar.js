import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    search: '',
  };

  handleChangeForm = e => {
    const { value } = e.target;
    this.setState({ search: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { search } = this.state;
    this.props.onSubmit(search);
    this.setState({
      search: '',
    });
  };

  render() {
    const { search } = this.state;

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.buttonForm}>
            <span className={s.labelForm}>Search</span>
          </button>

          <input
            onChange={this.handleChangeForm}
            value={search}
            className={s.inputForm}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
