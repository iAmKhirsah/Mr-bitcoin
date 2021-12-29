import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getContactById } from '../store/actions/contactActions';
import { TransferFund } from '../components/TransferFund';
import { Transactions } from '../components/Transactions';
export class _ContactDetailsPage extends Component {
  state = {
    contact: null,
    transfer: false,
  };
  componentDidMount() {
    this.loadUser();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadUser();
    }
  }
  handleTransfer = () => {
    this.setState({ transfer: !this.state.transfer });
  };
  async loadUser() {
    const contact = await this.props.getContactById(this.props.match.params.id);
    this.setState({ contact });
  }
  // removeUser = async () => {
  //   const { contact } = this.state;
  //   await contactService.deleteContact(contact._id);
  //   this.props.history.push('/');
  // };
  onGoBack = () => {
    this.props.history.push('/contacts/');
  };
  render() {
    const { contact, transfer } = this.state;
    const { loggedInUser } = this.props;
    console.log(contact);
    if (!contact) return <div>Loading...</div>;
    return (
      <div className="container">
        {transfer && <TransferFund to={contact} from={loggedInUser} />}
        {!transfer && (
          <div>
            <div className="contact-details-actions flex space-between align-center">
              <button onClick={this.onGoBack}>Back</button>
              <Link to={`/contact/edit/${contact._id}`}>Edit User</Link>
            </div>
            <div className="contact-details flex auto-center column">
              <div className='contact-details-img'>
                <img
                  src={`https://robohash.org/set_set5/${contact.name}?size=150x150`}
                  alt=""
                />
              </div>
              <div className="contact-details-content text-center">
                <h1>{contact.name}</h1>
                <h2>{contact.email}</h2>
                <h3>{contact.phone}</h3>
              </div>
              <div className='transactions'>
                <h1>Latest transactions:</h1>
                {contact.transactions.length ? <Transactions loggedInUser={loggedInUser} contact={contact} /> : 'No transactions recorded'}
                 <Transactions loggedInUser={loggedInUser} contact={contact} />
                <button onClick={this.handleTransfer}>Transfer</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    contact: state.contactModule.contact,
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  getContactById,
};

export const ContactDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactDetailsPage);
