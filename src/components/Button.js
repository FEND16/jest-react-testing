import React, { Component } from 'react';
import PropTypes from 'prop-types';

const buttonStyle = `bg-pink hover:bg-pink-light 
  text-white 
  font-bold py-2 px-4 
  border-b-4 
  border-pink-dark 
  hover:border-pink rounded mt-4
`;
const disabledButtonStyle = `
  opacity-50 
  cursor-not-allowed 
  ${buttonStyle}
`;

class Button extends Component {
  state = {
    disabled: this.props.disabled
  };

  /**
   * Disables the update-button for 30 sec 
   * so we don't call the API too often
   */
  handleClick = () => {
    this.setState({ disabled: true });
    setTimeout(() => {
      this.setState({ disabled: false });
    }, 30000);
    this.props.onClick();
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        className={`${this.state.disabled ? disabledButtonStyle : buttonStyle}`}
        data-test="button"
      >
        Update Rates
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false
}

export default Button;
