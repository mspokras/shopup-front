import {FetchBaseQueryArgs} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { getToken } from "../../entities/Admin/admin.models";
import { RootState } from "../../store/store";

const generatePrepareHeaders = (apiSlice: any): FetchBaseQueryArgs['prepareHeaders'] => {
    return (headers, { getState }) => {
    //   const state = getState() as RootState;
  
    //   const token = state.auth?.token;
  
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
  
    //   headers.set('Content-Type', 'application/json');
    //   headers.set('Accept', 'application/json');
    //   headers.set('Access-Control-Allow-Origin', '*');
  
    //   return headers;
    };
  };
  

export const baseQueryConfig: FetchBaseQueryArgs = {
    baseUrl: "https://shop-project-3d3e44da0df8.herokuapp.com",
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState; 
        // // const token = state.auth.token;

        // if (token) {
        //     headers.set('Authorization', `Bearer ${token}`);
        // }

        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');

        return headers;
    },
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
};

