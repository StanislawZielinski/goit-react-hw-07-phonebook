import React from "react";
import PropTypes from "prop-types";

const Contacts = ({ renderContacts, filter, contacts }) => {
        
        return (
                <ul className="contactsList-wrapper">{renderContacts(filter, contacts)}</ul>
    )}
export default Contacts

Contacts.propTypes = {
    renderContacts: PropTypes.func.isRequired,
    filter: PropTypes.string,
    contacts: PropTypes.array,
}