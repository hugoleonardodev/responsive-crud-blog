import React, { Component } from 'react';
// import M from 'materialize-css';

export default class MyFilterInputText extends Component {
  render() {
    const { filter, inputFilter } = this.props;
    return (
      <>
        <div className="input-field col s6">
          <i className="material-icons prefix">filter_alt</i>
          <input
            data-testid="filtering-input"
            className="validate"
            onChange={inputFilter}
            value={filter}
            name="filter"
            type="text"
            id="filter"
          />
          <label className="active" htmlFor="filter">
            Filter by
          </label>
        </div>
      </>
    );
  }
}
