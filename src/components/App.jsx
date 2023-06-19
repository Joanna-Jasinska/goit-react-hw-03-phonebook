import React, { Component } from 'react';
import { Phonebook } from './Phonebook/Phonebook';
// localStorage.clear();
const loadedContacts = JSON.parse(localStorage.getItem('contacts'));
console.log(`loadedContacts`);
console.log(loadedContacts);
const INIT = loadedContacts ? { contacts: [...loadedContacts] } : {};
export class App extends Component {
  constructor() {
    super();
    this.state = { ...INIT };
  }
  render() {
    return (
      <div className="app">
        <Phonebook {...this.state} />
      </div>
    );
  }
}
