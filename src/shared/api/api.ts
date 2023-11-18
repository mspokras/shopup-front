import {FetchBaseQueryArgs} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

export const baseQueryConfig: FetchBaseQueryArgs = {
    baseUrl: "https://shop-project-3d3e44da0df8.herokuapp.com",
    prepareHeaders: (headers, {endpoint}) => {
        // const session = getToken();
        // const {language} = i18n;
        // if (endpoint != 'getTranslateText') {
        //     headers.set('Authorization', `Bearer ${session.token}`);
        // }
        // headers.set('Accept-Language', language);
        // return headers;
    },
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
};