import { Component } from 'react';
import { ContactList } from '../components/ContactList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadContacts,
  removeContact,
  setFilterBy,
} from '../store/actions/contactActions';
import { Input } from '../components/Input';

class _ContactPage extends Component {
  async componentDidMount() {
    this.props.loadContacts();
  }
  onChangeFilter = (filterBy) => {
    console.log(filterBy);
    console.log(this.props);
    this.props.setFilterBy(filterBy);
    this.props.loadContacts();
  };
  removeUser = (contactId) => {
    this.props.removeContact(contactId);
  };
  render() {
    const { contacts } = this.props;
    return (
      <div className="contact-page container">
        <div className="contact-page-actions flex space-between full-grow">
          <Input onChangeFilter={this.onChangeFilter} />
          <Link to={`/contact/edit/`} className="new-contact">
            <p>New Contact</p>
          </Link>
        </div>
        <ContactList contacts={contacts} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactModule.contacts,
  };
};

const mapDispatchToProps = {
  loadContacts,
  removeContact,
  setFilterBy,
};

export const ContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactPage);
