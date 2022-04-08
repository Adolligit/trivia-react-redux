import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import thunkToken from '../redux/actions/thunkToken';
import newAction from '../redux/actions/index';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabledBtn: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = async () => {
    const { email, name } = this.state;
    const { getToken, history, dispatchAction } = this.props;

    await getToken(email);

    const tokenImg = md5(email).toString();
    const img = `https://www.gravatar.com/avatar/${tokenImg}`;
    dispatchAction('USER_IMG', img);
    dispatchAction('USER_NAME', name);
    dispatchAction('USER_EMAIL', email);
    history.push('/play');
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value }, () => {
      const { name: nome, email } = this.state;

      const isAbled = nome && email !== '';
      this.setState({ disabledBtn: !isAbled });
    });
  }

  render() {
    const { name, email, disabledBtn } = this.state;

    return (
      <form>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="Type your name"
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Type your e-mail"
            data-testid="input-gravatar-email"
          />
        </label>
        <input
          type="button"
          value="Play"
          data-testid="btn-play"
          disabled={ disabledBtn }
          onClick={ this.handleClick }
        />
        <Link to="/settings">
          <input
            type="button"
            value="Edit"
            data-testid="btn-settings"
          />
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: async (email) => dispatch(await thunkToken(email)),
  dispatchAction: (type, value) => dispatch(newAction(type, value)),
});

Login.propTypes = {
  getToken: PropTypes.func,
  dispatchAction: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
