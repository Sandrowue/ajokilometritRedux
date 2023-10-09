import * as React from 'react';
import {
    ActivityIndicator,
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';
import * as ReactRedux from 'react-redux';
import { hasSaveDirPermisssion } from './jsonFiles';
import SettingsScreen from './SettingsScreen';
import Main from './Main';
import store from './index';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#e09812',
        secondary: '#1f5ad5',
    },
};

export default function App() {
    const [settingsOk, setSettingsOk] = React.useState<boolean | null>(null);


    async function updateSettingsOk () {
        const hasPermission = await hasSaveDirPermisssion();
        setSettingsOk(hasPermission);
    }
    React.useEffect(() => {
        updateSettingsOk();
    }, []);

    return (
        <ReactRedux.Provider store={store}>
            <PaperProvider theme={theme}>
                {settingsOk == null ? (
                    <ActivityIndicator /> 
                ) : !settingsOk ? (
                    <SettingsScreen onChange={updateSettingsOk} />
                ) : (
                    <Main />
                )}
            </PaperProvider>
        </ReactRedux.Provider>
    );
}    




