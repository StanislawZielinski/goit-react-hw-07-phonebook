import React from "react";
import PropTypes from "prop-types";
import './DeleteBtn.css';

const DeleteBtn = ({deleteContact, id}) => {
            return (
                <button className="button-contact" onClick={()=>deleteContact(id)}>delete</button>
            )
} 
export default DeleteBtn

DeleteBtn.propTypes = {
    deleteContact: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}