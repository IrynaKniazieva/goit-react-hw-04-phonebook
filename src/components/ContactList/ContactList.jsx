import React from "react"
import PropTypes from "prop-types"

const ContactList = ({children}) => (
    <ul>{children}</ul>

)

ContactList.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default ContactList