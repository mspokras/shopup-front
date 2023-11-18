import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminApi } from "../entities/Admin/api/adminApi";
import { productApi } from "../entities/Product/api/productApi";
import { orderApi } from "../entities/Order/api/orderApi";

export const store = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
        .concat(adminApi.middleware)
        .concat(productApi.middleware)
        .concat(orderApi.middleware),
})
setupListeners(store.dispatch)