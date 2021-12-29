import { Component, createRef } from 'react';
import { contactService } from '../services/contactService';
import { connect } from 'react-redux';
import { getContactById, addContact } from '../store/actions/contactActions';
export class _ContactEditPage extends Component {
  state = {
    contact: null,
  };
  inputRef = createRef();
  async componentDidMount() {
    const contactId = this.props.match.params.id;
    const contact = contactId
      ? await this.props.getContactById(contactId)
      : contactService.getEmptyContact();
    this.setState({ contact }, () => this.inputRef.current.focus());
  }
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? target.value : target.value;
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }));
  };
  removeUser = async () => {
    const { contact } = this.state;
    await contactService.deleteContact(contact._id);
    this.props.history.push('/');
  };
  onSaveUser = async (ev) => {
    ev.preventDefault();
    await this.props.addContact({ ...this.state.contact });
    this.props.history.push('/');
  };
  onGoBack = () => {
    this.props.history.push(`/contact/${this.state.contact._id}`);
  };
  render() {
    const { contact } = this.state;
    if (!contact) return <div>Loading...</div>;
    return (
      <div>
        <div className='flex space-between align-center'>
          <button className="contact-edit-back" onClick={this.onGoBack}>
            Back
          </button>
          <button onClick={this.removeUser} className="contact-edit-delete">
            Delete
          </button>
        </div>
        <div className="contact-edit container">
          <h1>{this.props.match.params.id ? 'Edit User' : 'Add User'}</h1>
          <form
            onSubmit={this.onSaveUser}
            className="contact-edit-form flex column"
          >
            <label htmlFor="name">Name</label>
            <input
              ref={this.inputRef}
              onChange={this.handleChange}
              value={contact.name}
              type="text"
              name="name"
              id="name"
              placeholder="Name..."
            />
            <label htmlFor="email">Email</label>
            <input
              onChange={this.handleChange}
              value={contact.email}
              type="email"
              name="email"
              id="email"
              placeholder="Email..."
            />
            <label htmlFor="phone">Phone</label>
            <input
              onChange={this.handleChange}
              value={contact.phone}
              type="number"
              name="phone"
              id="phone"
              placeholder="Phone..."
            />
            <button className="flex">Save</button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    contact: state.contactModule.contact,
  };
};

const mapDispatchToProps = {
  getContactById,
  addContact,
};

export const ContactEditPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactEditPage);
