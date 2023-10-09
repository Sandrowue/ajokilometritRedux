import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Button, Text} from 'react-native-paper';

import { getSaveDirPermission} from './jsonFiles';

type Props = {
    onChange?: () => void;
}

export default function SettingsScreen({onChange}: Props) {
    async function handleSaveDirClick() {
        await getSaveDirPermission();
        onChange?.();
    }
    return (
        <SafeAreaView>
            <StatusBar />
            <ScrollView>
                <Text>
                    Asetukset
                </Text>
                <Button onPress={handleSaveDirClick}>
                    Aseta tallennuskansio
                </Button>
            </ScrollView>
        </SafeAreaView>
    )
}