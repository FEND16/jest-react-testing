import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadRates, mapObjectToArray } from '../api';
import Button from './Button';

export default class App extends Component {
  state = {
    rates: this.props.rates,
    date: this.props.date,
    base: this.props.base,
    error: '',
  };

  componentDidMount() {
    this.updateRates();
  }

  updateRates = () => {
    /* 
     * function for getting data and formatting data is
     * located in `api/index.js`
     */
    loadRates(this.state.date, this.state.base)
      .then(({ rates, date, base }) => {
        this.setState({ rates: mapObjectToArray(rates) , date, base })
      })
      .catch(e => this.setState({ error: e.message }));
  };

  renderList = rates => rates
    .map(rate => (
      <p className="py-2 px-4 mb-4 border rounded shadow" key={rate.key}>
        {rate.value} {rate.key}
      </p>
   ));

  render() {
    return (
      <div className="flex flex-col justify-center items-center w-1/2 mx-auto font-mono text-grey-darker mt-6">
        <div className="fixed pin-t pin-r m-4 font-mono uppercase text-sm flex flex-col items-center">
          <p>Updated: {this.state.date}</p>
          <Button onClick={this.updateRates} />
        </div>
        <h1 className="text-pink-dark mb-4">{this.state.base} Rates</h1>
        <p className="error">{this.state.error}</p>
        <div data-test="list">{this.renderList(this.state.rates)}</div>
      </div>
    );
  }
}

App.propTypes = {
  rates: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.number
  })),
  base: PropTypes.string,
  date: PropTypes.string
};

/* 
 * If no props are sent down from `index.js` the component
 * uses these props, default is EUR and todays rate
 */
App.defaultProps = {
  rates: [],
  base: 'EUR',
  date: 'latest'
};
