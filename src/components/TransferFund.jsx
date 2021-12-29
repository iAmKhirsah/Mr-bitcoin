import { Component } from 'react';
import { connect } from 'react-redux';
import { transfer } from '../store/actions/userActions';
export class _TransferFund extends Component {
  state = {
    coins: '',
  };
  handleChange = ({ target }) => {
    // const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState({ coins: value });
  };
  onTransferFunds = async (ev) => {
    ev.preventDefault();
    const { loggedInUser, to } = this.props;
    const { coins } = this.state;
    await this.props.transfer(to, loggedInUser, coins);
  };
  render() {
    const { to } = this.props;
    const { coins } = this.state;
    return (
      <div className="contact-edit container">
        <h3>Transfer coins to {to.name}:</h3>
        <form
          onSubmit={this.onTransferFunds}
          className="contact-edit-form flex column"
        >
          <input
            type="number"
            value={coins}
            onChange={this.handleChange}
            name="coins"
            id="coins"
            placeholder="Amount..."
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  transfer,
};

export const TransferFund = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TransferFund);
