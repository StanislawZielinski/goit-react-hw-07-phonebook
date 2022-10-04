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
import Notiflix from 'notiflix';
import { filterStore } from "redux/selectors";

const Phonebook = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery();
    const [addNewContact] = useAddNewPostMutation();
    const [deleteContact] = useDeletePostMutation();
    const dispatch = useDispatch();
    const filter = useSelector(filterStore);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const form = evt.currentTarget;
        const name = form.elements.name.value;
        const phoneNumber = form.elements.number.value;
        const id = nanoid();

        const checkingNameFn = (contact) => contact.name === name;
        const isNameNotOk = data.some(checkingNameFn);
        isNameNotOk && Notiflix.Notify.failure(`${name} is already in contacts`);

        const canSave = [name, phoneNumber, id, !isNameNotOk].every(Boolean) && !isLoading;
        if (canSave) {
            try {
                Notiflix.Loading.standard('wait...');
                Notiflix.Loading.remove(5000);
                await addNewContact({ name, phone: phoneNumber, id }).unwrap();
            }
            catch (error) {
                alert("Failed to add contact")
            }
        }
    }

    const deleteItem = async (id) => {
        Notiflix.Loading.standard('wait...');
        Notiflix.Loading.remove(5000);
        await deleteContact(id);
    };

    const renderContacts = (contacts, filter) => {
        if (!filter) {
            if (isLoading) {
                return <Audio/>
            }
            else if (isSuccess) {
                return contacts.map(contact => {
                    return <li className="contact-list-item" key={contact.id}><div className="contacts" >{contact.name}: {contact.phone}
                    <DeleteBtn deleteContact={deleteItem} id={contact.id} /></div>
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
            return <li className="contact-list-item" key={contact.id}><div className="contacts" >{contact.name}: {contact.phone}
            <DeleteBtn deleteContact={deleteItem} id={contact.id} /></div>
            </li>
        })
    )
    }

    const onChange = (evt) => {
        dispatch(filterContact(evt.target.value));
    };   

 return (
            <div className="wrapper">
                <Form handleSubmit={handleSubmit} />
                    <div className="contacts-wrapper">
                    <Filter onChange={onChange} />
                    <Contacts renderContacts={renderContacts}
                    contacts={data} filter={filter}/>
                </div>
            </div>
    )
}

export default Phonebook