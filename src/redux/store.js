import { configureStore, createReducer } from "@reduxjs/toolkit";
import { addContact, deleteContact, filterContact } from "../redux/actions";

const defaultContacts =
    [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];

const localStorageContacts = (JSON.parse(localStorage.getItem("newState")))===null ? (defaultContacts) : 
(JSON.parse(localStorage.getItem("newState")))

const INIT_STATE = {
    items: localStorageContacts,
    filter: '',
} ;

const contacts = createReducer(INIT_STATE, {
    [addContact]: (state, action) => { state.items = [...state.items,action.payload] },
    [deleteContact]: (state, action) => { state.items = [...action.payload] },
    [filterContact]: (state, action) => {state.filter = action.payload},
}); 

const store = configureStore({
    reducer: {
        contacts
    },
});

export default store;