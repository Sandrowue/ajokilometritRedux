import {useState} from 'react';
import {Trip} from './Trip';
import { useDispatch } from './hooks';
import { addOrUpdateTrip } from './trips';
import NewTripForm from './NewTripForm';
import { ScrollView } from 'react-native'

 
type Props = {
    onSubmit?: (trip: Trip) => void;
};

export default function NewTripCreator({onSubmit}: Props) {
    const [latestTripId, setLatestTripId] = useState<string | null>(null);
    const dispatch = useDispatch();

    return (
        <ScrollView>

            <NewTripForm
                key={latestTripId ?? ''} // Vaihda Form aina kun tallennetaan
                onSubmit={(trip: Trip) => {
                    dispatch(addOrUpdateTrip(trip));
                    setLatestTripId(trip.id);
                    onSubmit?.(trip);
                }
                }
        />
        </ScrollView>
    )
}