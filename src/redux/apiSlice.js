import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi(
    {
        reducerPath: 'api',
        baseQuery: fetchBaseQuery({ baseUrl: 'https://6332be4ba54a0e83d25775e6.mockapi.io/contacts' }),
        tagTypes: ['contacts'],
        endpoints: builder => (
            {
                getPosts: builder.query({
                    query: () => '/contacts',
                    transformResponse: res => res.sort((a,b)=>b.id - a.id),
                    providesTags: ['contacts']
                }),

                addNewPost: builder.mutation({
                    query: initialPost => ({
                        url: '/contacts',
                        method: 'POST',
                        // Include the entire post object as the body of the request
                        body: initialPost
                    }),
                    invalidatesTags: ['contacts']
                }),
                deletePost: builder.mutation({
                    query(id) {
                        return {
                            url: `/contacts/${id}`,
                            method: 'DELETE',
                        }
                    },
                    invalidatesTags: ['contacts']
                })
            }
        )
    }
)
export const { useGetPostsQuery, useAddNewPostMutation, useDeletePostMutation } = apiSlice;







// import axios from "axios";

// axios.defaults.baseURL = "https://6332be4ba54a0e83d25775e6.mockapi.io/contacts";

// const fetchContacts = createAsyncThunk(
//     'contacts/fetchAll',
//     async () => {
//         try {
//         const response = await axios.get("/contacts");
//         console.log(response);
//         return response
//         }
//         catch (e) {
//             console.log(e)
//         }
//     }
// );
// export default fetchContacts;