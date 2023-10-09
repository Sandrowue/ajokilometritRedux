import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

import {getRoundedTime} from './time';

type Props = {
    label: string;
    value?: Date | null;
    onChange?: (x: Date | null) => void;
};

export function DateTimeField({label, value: v, onChange}: Props) {
    const [value, setValue] = React.useState(v);
    const defaultValue = getRoundedTime(60);

    function openPicker(
        mode: 'date' | 'time',
        initialValue: Date,
        callback?: (x: Date) => void
    ) {
        DateTimePickerAndroid.open({
            mode,
            value: initialValue ?? defaultValue,
            onChange: (event: {type: string}, x: Date) => {
                if (event.type === 'set') { 
                    setValue(x);
                    onChange?.(x);
                    callback?.(x);   
                }         
        },
        is24Hour: true,
    });

}

const openTimePicker = (initialValue: Date) =>
    openPicker('time', initialValue);
const openDatePicker = () =>
    openPicker('date', value, (x) => openTimePicker(x));

const valueText = value?.toLocaleString() ?? '-------';

return (
    <View style={style.container}>
        <Text variant="labelLarge">{label}</Text>
        <Button onPress={openDatePicker}>{valueText}</Button>
    </View>
);
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});