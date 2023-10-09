import {useState} from 'react';
import {Trip} from './Trip';
import {saveTrip} from './store';
import NewTripForm from './NewTripForm';
import { ScrollView } from 'react-native'

 
type Props = {
    onSubmit?: (trip: Trip) => void;
};

export default function NewTripCreator({onSubmit}: Props) {
    const [latestTripId, setLatestTripId] = useState<string | null>(null)

    return (
        <ScrollView>

            <NewTripForm
                key={latestTripId ?? ''} // Vaihda Form aina kun tallennetaan
                onSubmit={(trip: Trip) => {
                    saveTrip(trip);
                    setLatestTripId(trip.id);
                    onSubmit?.(trip);
                }
                }
        />
        </ScrollView>
    )
}