import React from "react"
import { nanoid } from "nanoid"
// import PropTypes from 'prop-types';
import styles from './ContactForm.module.css'



class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
    
  };

  //----------Уникальные id, библиотека nanoid------
  nameInputId = nanoid();
  numberInputId = nanoid();

  // ---------Показывает то что ввожу в инпут / изменения --------
  handleChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value, id: nanoid(), });
    
  };

  //----------Вызывается при отправке формы---------
  handleSubmit = evt => {
    evt.preventDefault();

    //добавляю новый контакт
    this.props.onAddContact(this.state);

    //чищу форму после нажатия на кнопку "add contact"
    this.reset();
  };

  //-------- Очистить форму--------------------------
  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name } = this.state;
    const { number } = this.state;

    return (
      <form className={styles.contactForm} onSubmit={this.handleSubmit}>
        <label className={styles.contactLabel} htmlFor={this.nameInputId}>
          Name
          <input className={styles.contactInputName}
            onChange={this.handleChange}
            value={name}
            type="text"
            name="name"
            id={this.nameInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={styles.contactLabel} htmlFor={this.numberInputId}>
          Number
          <input className={styles.contactInputNumber}
            onChange={this.handleChange}
            value={number}
            type="tel"
            name="number"
            id={this.numberInputId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={styles.buttonAdd} type="submit">Add contact</button>
      </form>
    );
  }
}

// ContactForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   number: PropTypes.number.isRequired,
// }

export default ContactForm;