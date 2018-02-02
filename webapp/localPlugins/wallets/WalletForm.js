import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'bpanel-ui';

import { api } from 'bpanel/utils';

export default class WalletForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      walletId: ''
    };
  }

  static get propTypes() {
    return {
      addWallet: PropTypes.func
    };
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { walletId } = this.state;
    let wallet = await fetch(api.get.wallet(walletId), { mode: 'cors' });
    wallet = await wallet.json();
    window.sessionStorage.setItem('walletToken', wallet.token);
    window.sessionStorage.setItem('walletId', walletId);
    this.props.addWallet(wallet);
    this.setState({ walletId: '' });
  }

  handleChange(event) {
    this.setState({
      walletId: event.target.value
    });
  }

  render() {
    const { walletId } = this.state;
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <input
          type="text"
          onChange={event => this.handleChange(event)}
          value={walletId}
          placeholder="Wallet ID"
        />
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}
