import React, { useEffect } from "react";
import { nanoid } from 'nanoid';
import "./Phonebook.css"
import Form from "components/Form/Form";
import DeleteBtn from "components/DeleteBtn/DeleteBtn"
import Filter from "components/Filter/Filter"
import Contacts from "components/Contacts/Contacts";
import { useSelector, useDispatch } from "react-redux";
import { addContact, deleteContact, filterContact } from "../../redux/store";
import { useGetPostsQuery } from "redux/apiSlice";
import { useAddNewPostMutation } from "redux/apiSlice";
import { Audio } from 'react-loader-spinner';


const Phonebook = () => {
    const { data, isLoading, isSuccess, isError, error, refetch } = useGetPostsQuery();
    // console.log(isLoading, isSuccess, isError, error);
    console.log(data);
    const [addNewPost ] = useAddNewPostMutation();
    // const [addNewPost, { isLoading }] = useAddNewPostMutation();

    const dispatch = useDispatch();
    const contactArray = useSelector(state => state.contacts.items);
    // console.log(contactArray);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const form = evt.currentTarget;
        const name = form.elements.name.value;
        const phoneNumber = form.elements.number.value;
        const id = nanoid();
        const canSave = [name, phoneNumber, id].every(Boolean) && !isLoading;
        for (const contact of data) {
            if (contact.name.includes(name)) {
                alert(`${name} is already in contacts`)
                return
            }  
        };

        if (canSave) {
            try {
                await addNewPost({ name, phone: phoneNumber, id }).unwrap();
            }
            catch (error) {
                alert("Failed to add contact")
            }
        }
        
        // dispatch(addContact({name, number:phoneNumber, id }));
        // form.reset();
      }

    const deleteItem = (id) => {
        const newContactList = contactArray.filter((contact) =>
        contact.id !== (id));
        dispatch(deleteContact(newContactList));
    };

    const filter = useSelector(state => state.contacts.filter);

    // const renderContacts = (contacts) => {
    //     console.log(contacts);
    //     return contacts.map(contact => {
    //         return <li className="contacts" key={contact.id}>{contact.name}: {contact.phone}
    //             <DeleteBtn deleteContact={deleteItem} id={contact.id} />
    //         </li>
    //     })
    //     }

        const renderContacts = (contacts) => {
            if (contacts!==undefined) {
                return contacts.map(contact => {
            return <li className="contacts" key={contact.id}>{contact.name}: {contact.phone}
                <DeleteBtn deleteContact={deleteItem} id={contact.id} />
            </li>
            })
        } 
            }

        // const renderContacts = (filter, contacts) => {
        // if (!filter) {
        //     return contacts.map(contact => {
        //         return <li className="contacts" key={contact.id}>{contact.name}: {contact.number}
        //             <DeleteBtn deleteContact={deleteItem} id={contact.id} />
        //         </li>
        //     })
        // }

        //     const filterFunction = contacts.filter((el) => el.name.toLowerCase().includes(filter.toLowerCase()));
        //         return (
        //         filterFunction.map(contact =>
        //         {
        //             return <li className="contacts" key={contact.id}>{contact.name}: {contact.number}
        //                 <DeleteBtn deleteContact={deleteItem} id={contact.id} />
        //             </li>
        //         })
        //     )
        // }



    const onChange = (evt) => dispatch(filterContact(evt.target.value)) ;   
    
    // useEffect(() => {
    //     localStorage.setItem("newState", JSON.stringify(contactArray));
    // }, [contactArray]);
    let content;
    if (isLoading) {
        content =<Audio />
    }
    else if (isSuccess) {
        content = <Contacts renderContacts={renderContacts}
        contacts={data} />
    }
    else if (isError){
        content = <div>{error.toString()}</div>
    }

            return (
            <div className="wrapper">
                <Form handleSubmit={handleSubmit} />
                    <div className="contacts-wrapper">
                    <Filter onChange={onChange} />
                    {/* <Contacts renderContacts={renderContacts}
                    filter={filter} contacts={contactArray} /> */}
                    {/* <Contacts renderContacts={renderContacts}
                    contacts={contactArray} /> */}
                    {content}
                </div>
            </div>
    )
}

export default Phonebook