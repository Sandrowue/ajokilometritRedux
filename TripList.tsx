import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';

import { Trip } from './Trip';
import TripForm from './TripForm';

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

    function ListRow({ item: trip, index }: { item: Trip; index: number }) {
        return (
            <Button onPress={() => onTripClick?.(trip)} style={styles.item}>
                <Text style={styles.itemText}>{trip.description}</Text>
            </Button>
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
    item: {
        padding: 4,
        height: 50,
    },
    itemText: {
        fontSize: 20,
    },
});

