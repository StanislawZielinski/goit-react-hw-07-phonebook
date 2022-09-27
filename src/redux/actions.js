import { createAction } from "@reduxjs/toolkit";

export  const addContact = createAction("ADD");
export const deleteContact = createAction("DELETE");
export const filterContact = createAction("FILTER");