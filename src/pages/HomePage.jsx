import { Component } from 'react';
import { apiService } from '../services/apiService';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Transactions } from '../components/Transactions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';

export class _HomePage extends Component {
  state = {
    // currUser: null,
    btc: null,
  };
  async componentDidMount() {
    this.setState({
      btc: await apiService.getBitcoinValue(),
    });
  }

  render() {
    const { btc } = this.state;
    const { loggedInUser } = this.props;
    if (!loggedInUser)
      return (
        <div className="home-page container">
          <h1>
            Hello Guest, please <NavLink to="/signup">Signup</NavLink>
          </h1>
        </div>
      );
    return (
      <div className="home-page container">
        <h1>Hello, {loggedInUser.name}</h1>
        <div className="balance-home flex space-between">
          <div>
            <h2>Current Balance</h2>
            <h3>BTC: {loggedInUser.coins} <FontAwesomeIcon icon={faBitcoin}/></h3>
          </div>
          <div>
            <h2>Converted balance</h2>
            <h3>USD: {(loggedInUser.coins / btc).toLocaleString('en-GB')}$</h3>
          </div>
        </div>
        <div className='transactions'>
          <h1>Latest transactions:</h1>
          {loggedInUser.transactions.length ? <Transactions loggedInUser={loggedInUser} /> : 'No transactions recorded'}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage);
