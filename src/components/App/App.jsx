import React from 'react';
import { useState } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import styles from './App.module.css';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import ContactItem from '../ContactItem/ContactItem';
import Filter from '../Filter/Filter';
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  //   // Добавление нового контакта
  const addContact = (name, number) => {
    const newContact = { id: nanoid(), name, number };
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts(contacts => [newContact, ...contacts]);
  };

  //   // фильтр
  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  //   // Удаление контакта
  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  //   // Только видимые
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={styles.sectionContacts}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onAddContact={addContact} />

      <h2 className={styles.title}>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactList>
        <ContactItem
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </ContactList>
    </div>
  );
}
