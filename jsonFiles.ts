import * as FileSystem from 'expo-file-system';
import {StorageAccessFramework as SAF} from 'expo-file-system';
import { getSettings, setSetting } from './settings';

export async function loadJsonFile(filename: string): Promise<any | null> {
    const contents = await loadJsonFileContents(filename);
    if (!contents) {
        return null;
    }
    try {
        return parseJsonWithDates(contents);
    } catch (error) {
        console.error('JSON-jäsennysvirhe: ', error, 'JSON oli:', contents);
        return null;
    }
}

const dateRx = /^\d{4}-[01]\d-[0-3]\dT\d\d:\d\d:\d\d\.?\d{0,6}(Z|[+-]\d{4})$/;

function parseJsonWithDates(contents: string): any {
    function parseDate(key: string, value: any) {
        if (typeof value === 'string' && dateRx.test(value)) {
            try {
                return new Date(value);
            } catch {}
        }
        return value;
    }
    return JSON.parse(contents, parseDate);
}

async function loadJsonFileContents(filename: string): Promise<string | null> {
    const uri = await getJsonFileUri(filename);
    try {
        return await FileSystem.readAsStringAsync(uri);
    } catch {
        return null;
    }
}

export async function overwriteJsonFile(filename: string, data: any) {
    const contents = JSON.stringify(data);
    const oldUri = await getJsonFileUri(filename);
    if (oldUri) {
        await Promise.all([
            clearJsonFileUriInSettings(filename),
            FileSystem.deleteAsync(oldUri),
        ]);
    }
    const uri = await getJsonFileUri(filename);
    await FileSystem.writeAsStringAsync(uri, contents);
}

export async function hasSaveDirPermisssion(): Promise<boolean> {
    const saveDirUri = await getAccessibleSaveDirUri();
    return (saveDirUri) ? true : false;    
}

export async function getSaveDirPermission(): Promise<void> {
    await getPermissionToSaveDirUri();
}

async function getSaveDirUri(): Promise<string> {
    let saveDirUri = await getAccessibleSaveDirUri();
    if (!saveDirUri) {
        saveDirUri = await getPermissionToSaveDirUri();
    }
    return saveDirUri;   
}

async function getAccessibleSaveDirUri(): Promise<string | null> {
    const settings = await getSettings();
    const {saveDirUri} = settings;

    if (saveDirUri) {
        try {
            await SAF.readDirectoryAsync(saveDirUri);
            return saveDirUri;
        } catch {}
    }
    return null;
}

async function getPermissionToSaveDirUri(): Promise<string> {
    const permResult = await SAF.requestDirectoryPermissionsAsync();

    if (!permResult.granted) {
        throw Error('Ei saatu oikeutta tallennuskansioon');
    }
    const {directoryUri} = permResult;
    await setSetting('saveDirUri', directoryUri);
    return directoryUri;    
}

async function getJsonFileUri(filename: string): Promise<string> {
    const settings = await getSettings();
    let uri = settings?.jsonFileUris?.[filename];
    if (uri) {
        try {
            const fileInfo = await FileSystem.getInfoAsync(uri);
            if (fileInfo.exists) return uri;
        } catch {}
    }
    uri = await SAF.createFileAsync(
        await getSaveDirUri(),
        filename,
        'application/json'
    );
    const jsonFileUris = {...settings.jsonFileUris, [filename]: uri};
    await setSetting('jsonFileUris', jsonFileUris);
    return uri;
}

async function clearJsonFileUriInSettings(filename: string) {
    const settings = await getSettings();
    const jsonFileUris = {...settings.jsonFileUris, [filename]: undefined};
    setSetting('jsonFileUris', jsonFileUris);
}