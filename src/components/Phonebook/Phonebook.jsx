import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import css from './Phonebook.module.css';

export class Phonebook extends Component {
  constructor({ contacts, name, number, filter }) {
    super();
    this.state = {
      contacts: [...contacts],
      ...{ name },
      ...{ number },
      ...{ filter },
    };
  }
  static defaultProps = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  SaveContacts = () => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };
  componentDidUpdate() {
    this.SaveContacts();
  }
  Title = ({ title }) => <h2 className={css.title}>{title}</h2>;

  filterContacts = filter => {
    return this.state.contacts.filter(
      el =>
        el.name.toLowerCase().includes(filter.toLowerCase()) ||
        el.number
          .toLowerCase()
          .trim()
          .replace(/ |-/g, '')
          .includes(filter.toLowerCase().trim().replace(/ |-/g, ''))
    );
  };
  addContactHandle = (e, newContact) => {
    console.log(`clicked e, newcontact, Phonebook.this.state:`);
    e.preventDefault();
    const filtered =
      this.state.contacts.find(
        c => c.name.toLowerCase() === newContact.name.toLowerCase()
      ) || 0;
    if (filtered !== 0) {
      this.setState({ filter: filtered.name });
      alert(`You aready have ${filtered.name} in your phonebook.

      ${filtered.name} ${filtered.number}`);
      return;
    }
    const filteredNum =
      this.state.contacts.find(
        c => c.number.toLowerCase() === newContact.number.toLowerCase()
      ) || 0;
    if (filteredNum !== 0) {
      alert(`You aready have this number in your phonebook.
      
      ${filteredNum.name} ${filteredNum.number}`);
      this.setState({ filter: filteredNum.number });
      return;
    }
    this.setState(prev => ({
      ...prev,
      contacts: [...prev.contacts, { ...newContact }],
    }));
    this.setState({ name: '', number: '', filter: '' });
    console.log(this.state);
  };
  deleteContactHandle = (e, contact) => {
    console.log(`clicked delete, Phonebook.this.state:`);
    e.preventDefault();
    this.setState(prev => {
      console.log(`to be deleted contact:`);
      console.log(contact);
      return {
        contacts: [...prev.contacts.filter(c => c.id !== contact.id)],
      };
    });
    console.log(this.state);
  };
  inputOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log('Input change Phonebook.this.state:');
    console.log(this.state);
  };

  render() {
    return (
      <div className={css.phonebook}>
        <this.Title title="Phonebook" />
        <ContactForm
          {...this.state}
          addContactHandle={this.addContactHandle}
          inputOnChange={this.inputOnChange}
        />

        <this.Title title="Contacts" />
        <ContactList
          {...this.state}
          inputOnChange={this.inputOnChange}
          deleteContactHandle={this.deleteContactHandle}
          filterContacts={this.filterContacts}
        />
      </div>
    );
  }
}
// { contacts, name, number, filter }
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  name: PropTypes.string,
  number: PropTypes.string,
  filter: PropTypes.string,
};
