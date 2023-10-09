export function getRoundedTime(precisionSeconds: number = 1): Date {
    const milliseconds = new Date().getTime();
    const precisionMS = 1000 * precisionSeconds;
    const rounded = Math.floor(milliseconds / precisionMS) * precisionMS;
    return new Date(rounded)
}