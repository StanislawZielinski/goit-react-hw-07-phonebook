import React from "react";
import { nanoid } from 'nanoid';
import "./Phonebook.css"
import Form from "components/Form/Form";
import DeleteBtn from "components/DeleteBtn/DeleteBtn"
import Filter from "components/Filter/Filter"
import Contacts from "components/Contacts/Contacts";
import { useSelector, useDispatch } from "react-redux";
import {  filterContact } from "../../redux/store";
import { useGetPostsQuery, useAddNewPostMutation, useDeletePostMutation } from "redux/apiSlice";
import { Audio } from 'react-loader-spinner';



const Phonebook = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery();
    const [addNewContact] = useAddNewPostMutation();
    const [deleteContact] = useDeletePostMutation();
    const dispatch = useDispatch();
    const filterStore = useSelector(state => state.contacts.filter);

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
                await addNewContact ({ name, phone: phoneNumber, id }).unwrap();
            }
            catch (error) {
                alert("Failed to add contact")
            }
        }
        // form.reset();
    }

    const deleteItem = async (id) => {
        await deleteContact(id);
    };

    const renderContacts = (contacts, filter) => {
        console.log(filter)
        if (!filter) {
            if (isLoading) {
                return <Audio/>
            }
            else if (isSuccess) {
                return contacts.map(contact => {
                    return <li className="contacts" key={contact.id}>{contact.name}: {contact.phone}
                        <DeleteBtn deleteContact={deleteItem} id={contact.id} />
                    </li>
                })
            }
            else if (isError){
                return <div>{error.toString()}</div>
            }
        }

        const filterFunction = contacts.filter((el) => el.name.toLowerCase().includes(filter.toLowerCase()));
    
        return (
        filterFunction.map(contact =>
        {
            return <li className="contacts" key={contact.id}>{contact.name}: {contact.phone}
                <DeleteBtn deleteContact={deleteItem} id={contact.id} />
            </li>
        })
    )


    }

    //     let content;
    // if (isLoading) {
    //     content =<Audio/>
    // }
    // else if (isSuccess) {
    //     content = <Contacts renderContacts={renderContacts}
    //     contacts={data} />
    // }
    // else if (isError){
    //     content = <div>{error.toString()}</div>
    // }
    
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


    const onChange = (evt) => {
        // console.log(evt.target.value);
        dispatch(filterContact(evt.target.value));
    };   
    
    // useEffect(() => {
    //     localStorage.setItem("newState", JSON.stringify(contactArray));
    // }, [contactArray]);


            return (
            <div className="wrapper">
                <Form handleSubmit={handleSubmit} />
                    <div className="contacts-wrapper">
                    <Filter onChange={onChange} />
                    <Contacts renderContacts={renderContacts}
                    contacts={data} filter={filterStore}/>
                    {/* {content} */}
                </div>
            </div>
    )
}

export default Phonebook