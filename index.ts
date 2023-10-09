import { configureStore} from "@reduxjs/toolkit";

import tripsSlice from './trips';

const store = configureStore({
    reducer: {
        trips: tripsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;