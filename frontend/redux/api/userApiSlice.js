import { apiSlice } from "../../src/services/api";
import { USER_URL } from "../constant.js";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query: (data) => ({
                url: `/api/users/login`,
                method: "POST",
                body: data,
              }),
        }),
        logout: builder.mutation({
            query:()=>({
                url: `/api/users/logout`,
                method: "POST",
            }),
        }),
        addUser: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/add`,
              method: "POST",
              body: data,
            }),
          }),
    }),
});

export const {useLoginMutation, useLogoutMutation, useAddUserMutation} = userApiSlice;