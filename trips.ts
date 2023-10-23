import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Trip } from './Trip';
import * as tripFileStore from './tripFileStore';

export type TripsState = {
    list: Trip[];
    status: 'loading' | 'idle' | 'failed';
    error?: SerializedError | null;
};

export const loadTrips = createAsyncThunk('trips/loadTrips', async () => {
    return await tripFileStore.loadTrips();
});

export const tripsSlice = createSlice({
    name: 'trips',
    initialState: { list: [], status: 'loading' } as TripsState,
    reducers: {
        addOrUpdateTrip: (
            { list: trips },
            { payload: trip }: PayloadAction<Trip>
        ) => {
            const index = trips.findIndex((x) => x.id === trip.id);
            let needsSorting = true;
            if (index < 0) {
                // Ei löytynyt id:llä => Uusi matka
                trips.unshift(trip); // Lisätään annettu trip listan trips alkuun
                if (trips.length <= 1 || isTripBeforeOther(trip, trips[1]))
                    needsSorting = false;
            } else {
                if (trips[index].timestampAtBegin == trip.timestampAtBegin)
                    needsSorting = false;
                trips[index] = trip; // Päivitetään ko. indexissä olevaa trippiä
            }

            // Järjestää tripit aloitusajan tai id:n mukaan

            if (needsSorting) trips.sort(compareTrips);
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
            .addCase(loadTrips.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            });
    },
});

export const { addOrUpdateTrip, removeTrip } = tripsSlice.actions;

function isTripBeforeOther(trip: Trip, other: Trip): boolean {
    return compareTrips(trip, other) <= 0; 
}

function compareTrips(tripA: Trip, tripB: Trip): number {
    const a = tripA.timestampAtBegin ?? null;
    const b = tripB.timestampAtBegin ?? null;
    if (a == b) {
        // Vertaile id:n perusteella, jos timestampit ovat samat
        // tai puuttuvat molemmista
        const aId = tripA.id;
        const bId = tripB.id;
        return aId > bId ? -1 : aId == bId ? 0 : 1;
    }
    if (a == null) return -1;
    return a > b ? -1 : 1;
}

export default tripsSlice;