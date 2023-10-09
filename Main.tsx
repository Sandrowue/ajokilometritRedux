import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//const Stack = createNativeStackNavigator();
import { NavigationContainer } from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {useState} from 'react';
import NewTripCreator from './NewTripCreator';
import { Trip } from './Trip';
import TripList from './TripList';
import { deleteTrip, loadTrips, saveTrip } from './store';

const Nav = createBottomTabNavigator();

const tabIcons = {
    trips: ['ios-list-circle', 'ios-list-circle-outline'],
    newTrip: ['ios-car', 'ios-car-outline'],
};

const getScreenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => (
        <Ionicons
            name={tabIcons[route.name][focused ? 0 : 1]}
            size={size}
            color={color}
            />
    ),
    tabBarActiveTintColor: '#d5661f',
    tavBarInactiveTintColor: '#7f7974',
    headerShown: true,
});

export default function Main() {
    const [trips, setTrips] = React.useState<Trip[]>([]);
    const [shownTripId, setShownTripId] = useState<string | null>(null)
    
    async function reloadTrips() {
        const newTrips = await loadTrips();
        setTrips(newTrips);
    }
    React.useEffect(() => {
        reloadTrips();
    }, []
    );

    function TripListScreen() {
        return (
            <TripList
                shownTripId={shownTripId}
                trips={trips}
                onTripClick={(trip: Trip) => setShownTripId(trip.id)}
                onDismiss={() => setShownTripId(null)}
                onSave={async (trip: Trip) => {
                    setShownTripId(null);
                    await saveTrip(trip);
                    await reloadTrips();
                }
            }
                onDelete={async (trip: Trip) => {
                    setShownTripId(null);
                    await deleteTrip(trip);
                    await reloadTrips();
                }
            }
            />
        );
    }

    function NewTripScreen({navigation}) {
        return (
            <NewTripCreator
                onSubmit={async(trip: Trip) => {
                    await reloadTrips();
                    setShownTripId(trip.id);
                    navigation.navigate('trips');
                }}
            />
        );
    }

    return (
        <NavigationContainer>
            <Nav.Navigator screenOptions={getScreenOptions}>
                <Nav.Screen
                    name="trips"
                    component={TripListScreen}
                    options={{title: 'Matkat'}}
                />
                <Nav.Screen
                    name="newTrip"
                    component={NewTripScreen}
                    options={{title: 'Uusi matka'}}
                />
   
            </Nav.Navigator>
        </NavigationContainer>
    );

}   