import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Trip } from './Trip';
import * as tripFileStore from './tripFileStore';

export type TripState = {
    list: Trip[];
    status: 'loading' | 'idle' | 'failed';
};

export const loadTrips = createAsyncThunk('trips/loadTrips', async () => {
    return await tripFileStore.loadTrips();
});

export const tripsSlice = createSlice({
    name: 'trips',
    initialState: { list: [], status: 'loading' } as TripState,
    reducers: {
        addOrUpdateTrip: (
            { list: trips },
            { payload: trip }: PayloadAction<Trip>
        ) => {
            const index = trips.findIndex((x) => x.id === trip.id);
            if (index < 0) {
                // Ei löytynyt id:llä => Uusi matka
                trips.unshift(trip); // Lisätään annettu trip listan trips alkuun
            } else {
                trips[index] = trip; // Päivitetään ko. indexissä olevaa trippiä
            }


            // järjestää tripit aloitusajan tai id:n mukaan
            trips.sort((tripA: Trip, tripB: Trip) => {
                const a = tripA.timestampAtBegin ?? null;
                const b = tripB.timestampAtBegin ?? null;
                if (a == b) {
                    // Vertaile id:n perusteella, jos timestampit ovat samat tai puuttuvat molemmista
                    const aId = tripA.id;
                    const bId = tripB.id;
                    return aId > bId ? -1 : aId == bId ? 0 : 1;
                }
                return a > b ? -1 : 1;

            });
            tripFileStore.saveTripsToFile(trips);
        },
        removeTrip: (
            { list: trips },
            { payload: { id } }: PayloadAction<{ id: string }>
        ) => {
            const index = trips.findIndex((x) => x.id === id);
            if (index < 0) {
                throw new Error(`Matkaa id:llä ${id} ei löydy`);
            }
            trips.splice(index, 1); // Poista 1 alkio kohdasta index
        },
        resetTrips: (
            { list: trips },
            { payload: newTrips }: PayloadAction<Trip[]>
        ) => {
            trips = newTrips;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTrips.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                loadTrips.fulfilled,
                (state, action: PayloadAction<Trip[]>) => {
                    state.status = 'idle';
                    state.list = action.payload;
                }
            )
            .addCase(loadTrips.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { addOrUpdateTrip, removeTrip } = tripsSlice.actions;

export default tripsSlice;