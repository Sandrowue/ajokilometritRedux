import * as FileSystem from 'expo-file-system';

type Settings = {
    saveDirUri?: string | null;
    jsonFileUris?: {
        [key: string]: string;
    };
};

const settingsFileUri = FileSystem.documentDirectory + 'settings.json';

let globalSettings: Settings | null | undefined = undefined;

export async function getSettings(): Promise<Settings> {
    if (globalSettings === undefined) {
        globalSettings = await loadSettings();
    }
    return globalSettings;
}

export async function setSetting<T extends keyof Settings>(
    setting: T,
    value: Settings[T]
): Promise<Settings> {
    globalSettings[setting] = value;
    await saveSettings(globalSettings);
    return globalSettings;
}

async function loadSettings(): Promise<Settings> {
    let jsonContent: string;
    try {
        jsonContent = await FileSystem.readAsStringAsync(settingsFileUri);
    } catch {
        return {};
    }
    return JSON.parse(jsonContent || '{}');
}

async function saveSettings(settings: Settings): Promise<void> {
    const jsonContent = JSON.stringify(settings);
    await FileSystem.writeAsStringAsync(settingsFileUri, jsonContent)
}
