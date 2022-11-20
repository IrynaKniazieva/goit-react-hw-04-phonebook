import React from "react"
import styles from './App.module.css'

import ContactForm from "../ContactForm/ContactForm"
import ContactList from "../ContactList/ContactList"
import ContactItem from "../ContactItem/ContactItem"
import Filter from "../Filter/Filter"

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // Добавление нового контакта
  addContact = data => {
    const { contacts } = this.state;
    contacts.find(contact => contact.name === data.name)
      ? alert(`${data.name} is already in contact`)
      : this.setState(prevState => ({
          contacts: [data, ...prevState.contacts],
        }));
  };

  // фильтр
  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  // Удаление контакта
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  // Только видимые
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    console.log ('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
// если по условию есть контакты выполнится если нет не выполнится
    if (parsedContacts) {
      this.setState({contacts: parsedContacts});
    }
  }

  // если state обновился записываем в localStorage
  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    // проверку делать обязательно иначе будет зацикливание
    if(this.state.contacts !== prevState.contacts) {
      console.log("обновилось")
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;

    return (
      <div className={styles.sectionContacts}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h2 className={styles.title}>Contacts</h2>
        <Filter filter={filter} onChange={this.changeFilter} />
        <ContactList>
          <ContactItem
            contacts={this.getVisibleContacts()}
            onDeleteContact={this.deleteContact}
          />
        </ContactList>
      </div>
    );
  }
}

export default App;