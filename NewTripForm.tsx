import {useState} from 'react';
import {ScrollView} from 'react-native';
import {Button, SegmentedButtons, TextInput} from 'react-native-paper';
import {cleanNumberText, parseNumber} from './numbers';
import {Trip} from './Trip';
import {newId} from './newId';
import { dateToTimestamp } from './time';

type Props = {
    onSubmit?: (trip: Trip) => void;
};

export default function NewTripForm({onSubmit}: Props) {
    const defaultCar = 'car1';
    const[vehicle, setVehicle] = useState(defaultCar);
    const[description, setDescription] = useState('');
    const[odometerAtBegin, setOdometerAtBegin] = useState<string>('');
    const[routeDescription, setRouteDescription] = useState('');

    function submitForm() {
        const trip: Trip = {
            id: newId(),
            vehicleId: vehicle, 
            description,
            timestampAtBegin: dateToTimestamp(new Date()),
            timestampAtEnd: null,
            odometerAtBegin: parseNumber(odometerAtBegin),
            odometerAtEnd: null,
            routeDescription,
        };
        onSubmit?.(trip);
    }
       
    return (
        <ScrollView>
            <SegmentedButtons
                value={vehicle}
                onValueChange={setVehicle}
                buttons={[
                    {value: 'car1', label: 'Auto 1'},
                    {value: 'car2', label: 'Auto 2'},
                ]}
            />
            <TextInput label="Ajon kuvaus" value={description} onChangeText={setDescription}/>
            <TextInput label="Mittarilukema alussa" keyboardType='numeric' value={odometerAtBegin} onChangeText={(x) => setOdometerAtBegin(cleanNumberText(x))} />
            <TextInput label="Reitin kuvaus" value={routeDescription} onChangeText={setRouteDescription}/>
            
            {onSubmit ? (
                <Button onPress={submitForm} mode="contained">
                    Aloita matka
                </Button>
            ) :null} 
        </ScrollView>
    );
    }