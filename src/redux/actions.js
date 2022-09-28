import { createAction } from "@reduxjs/toolkit";
console.log("object");
export  const addContact = createAction("ADD");
export const deleteContact = createAction("DELETE");
export const filterContact = createAction("FILTER");

