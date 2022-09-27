import React, { useEffect } from "react";
import { nanoid } from 'nanoid';
import "./Phonebook.css"
import Form from "components/Form/Form";
import DeleteBtn from "components/DeleteBtn/DeleteBtn"
import Filter from "components/Filter/Filter"
import Contacts from "components/Contacts/Contacts";
import { useSelector, useDispatch } from "react-redux";
import { addContact, deleteContact, filterContact } from "../../redux/actions";


const Phonebook = () => {
    const dispatch = useDispatch();
    const contactArray = useSelector(state => state.contacts.items);
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const form = evt.currentTarget;
        const name = form.elements.name.value;
        const phoneNumber = form.elements.number.value;
        const id = nanoid();
        for (const contact of contactArray) {
            if (contact.name.includes(name)) {
                alert(`${name} is already in contacts`)
                return
            }  
        };
        dispatch(addContact({name, number:phoneNumber, id }));
        form.reset();
      }

    const deleteItem = (id) => {
        const newContactList = contactArray.filter((contact) =>
        contact.id !== (id));
        dispatch(deleteContact(newContactList));
    };

    const filter = useSelector(state => state.contacts.filter);

    const renderContacts = (filter, contacts) => {
        if (!filter) {
        return contacts.map(contact => {
            return <li className="contacts" key={contact.id}>{contact.name}: {contact.number}
                <DeleteBtn deleteContact={deleteItem} id={contact.id} />
            </li>
        })
        }

        const filterFunction = contacts.filter((el) => el.name.toLowerCase().includes(filter.toLowerCase()));
            return (
            filterFunction.map(contact =>
            {
                return <li className="contacts" key={contact.id}>{contact.name}: {contact.number}
                    <DeleteBtn deleteContact={deleteItem} id={contact.id} />
                </li>
            })
        )
    }

    const onChange = (evt) => dispatch(filterContact(evt.target.value)) ;   
    
    useEffect(() => {
        localStorage.setItem("newState", JSON.stringify(contactArray));
    }, [contactArray]);


            return (
            <div className="wrapper">
                <Form handleSubmit={handleSubmit} />
                    <div className="contacts-wrapper">
                    <Filter onChange={onChange} />
                    <Contacts renderContacts={renderContacts}
                    filter={filter} contacts={contactArray} />
                </div>
            </div>
    )
}

export default Phonebook