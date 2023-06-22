import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { nanoid } from 'nanoid';
import css from './../Phonebook.module.css';

export class ContactList extends Component {
  filterContacts = (filter, contacts) => {
    return contacts.filter(
      el =>
        el.name.toLowerCase().includes(filter.toLowerCase()) ||
        el.number
          .toLowerCase()
          .trim()
          .replace(/ |-/g, '')
          .includes(filter.toLowerCase().trim().replace(/ |-/g, ''))
    );
  };
  Entry = ({ name, number, id }) => {
    return (
      <li className={css.entry} id={id}>
        {name + ': ' + number}
        <button
          key={`${name}${number}btn${id}`}
          className={`${css.button} ${css.delete}`}
          type="button"
          onClick={e => this.props.deleteContactHandle(e, { name, number, id })}
        >
          Delete
        </button>
      </li>
    );
  };
  render() {
    return (
      <div className={css.contacts}>
        <label className={css.label} htmlFor="filter">
          Find contacts
        </label>
        <input
          className={css.input}
          type="text"
          id="filter"
          name="filter"
          onChange={this.props.inputOnChange}
          value={this.props.filter}
          title="Will show only contacts that match search quota written here."
        />
        {this.props.filter ? (
          <button
            className={`${css.button} ${css.delete}`}
            type="button"
            onClick={e =>
              this.props.inputOnChange({
                target: { name: 'filter', value: '' },
              })
            }
          >
            Clear
          </button>
        ) : (
          ''
        )}
        <ul className={css.list}>
          {this.filterContacts(this.props.filter, this.props.contacts).map(
            el => {
              return (
                <this.Entry
                  name={el.name}
                  number={el.number}
                  id={`${el.id}`}
                  key={`entry${el.id}`}
                />
              );
            }
          )}
        </ul>
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
  ).isRequired,
  filter: PropTypes.string.isRequired,
  inputOnChange: PropTypes.func.isRequired,
  deleteContactHandle: PropTypes.func.isRequired,
};
