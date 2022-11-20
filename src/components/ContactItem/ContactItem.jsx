import React from "react"
import styles from './ContactItem.module.css'
import PropTypes from "prop-types"

const ContactItem = ({contacts, onDeleteContact}) => (
    <> 
        {contacts.map(({ name, number, id}) => (
            <li key={id} className={styles.contactItem}>
                {name} : <span>{number}</span>
                <button className={styles.button} onClick={() => onDeleteContact(id)}>Delete</button>  
            </li>
        ))}
    </>
)

ContactItem.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,  
  };

export default ContactItem