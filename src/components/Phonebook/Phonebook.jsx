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
      name,
      number,
      filter,
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

  addContactHandle = (e, newContact) => {
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
  };
  deleteContactHandle = (e, contact) => {
    e.preventDefault();
    this.setState(prev => {
      return {
        contacts: [...prev.contacts.filter(c => c.id !== contact.id)],
      };
    });
  };
  inputOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={css.phonebook}>
        <this.Title title="Phonebook" />
        <ContactForm
          name={this.state.name}
          number={this.state.number}
          addContactHandle={this.addContactHandle}
          inputOnChange={this.inputOnChange}
        />

        <this.Title title="Contacts" />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          inputOnChange={this.inputOnChange}
          deleteContactHandle={this.deleteContactHandle}
        />
      </div>
    );
  }
}
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
