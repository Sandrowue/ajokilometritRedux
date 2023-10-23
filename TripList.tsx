import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple, Modal, Portal } from 'react-native-paper';

import { Trip } from './Trip';
import TripForm from './TripForm';
import { timestampToString } from './time';

type Props = {
    trips: Trip[];
    shownTripId?: string | null;
    onTripClick?: (trip: Trip) => void;
    onDismiss?: (trip: Trip) => void;
    onSave?: (trip: Trip) => void;
    onDelete?: (trip: Trip) => void;
};

export default function TripList({ 
    trips,
    shownTripId,
    onTripClick,
    onDismiss,
    onSave,
    onDelete,
}: Props) {

    function ListRow({ item: trip}: { item: Trip}) {
        const isOpen = trip.timestampAtEnd == null;
        return (
            <TouchableRipple onPress={() => onTripClick?.(trip)}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTime}>
                        {timestampToString(trip.timestampAtBegin)}
                        {trip.timestampAtEnd
                            ? ' - ' + timestampToString(trip.timestampAtEnd)
                            : null
                        }
                    </Text>
                    <Text
                        style={[
                            styles.itemText,
                            isOpen ? styles.openItem : styles.closedItem,
                        ]}
                        >{trip.description}
                        </Text>
                </View>
            </TouchableRipple>
        );
    }

    function TripFormModal() {
        const shownTrip = shownTripId
            ? trips.find((x) => x.id === shownTripId)
            : null;
        return (
            <Modal
                visible={shownTrip ? true : false}
                onDismiss={() => onDismiss(shownTrip)}
                contentContainerStyle={styles.container}
            >
                <TripForm 
                    initialValue={shownTrip}
                    onSubmit={async (trip: Trip) => onSave?.(trip)}
                    onDelete={async () => onDelete?.(shownTrip)}
                    
                />
            </Modal>
        );
    }

    return (
        <>
            <FlatList 
                data={trips} 
                renderItem={ListRow} 
                style={styles.list} 
                keyExtractor={(item: Trip) => item.id} />
            <Portal>
                <TripFormModal />
            </Portal>
        </>
    )

}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
    list: {},
    itemContainer: {
        padding: 4,
        paddingTop: 6,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        height: 50,
    },
    openItem: {
        color: 'red'
    },
    closedItem: {},
    itemText: {
        fontSize: 20,
    },
    itemTime: {
        fontSize: 12
    }
});

