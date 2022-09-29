import React from "react";
import PropTypes from "prop-types";
// pamietaj filter
const Contacts = ({ renderContacts, contacts, filter }) => {   
    return (
        <ul className="contactsList-wrapper">{renderContacts(contacts, filter)}</ul>
    )
}

Contacts.propTypes = {
    renderContacts: PropTypes.func.isRequired,
    filter: PropTypes.string,
    contacts: PropTypes.array,
}

export default Contacts