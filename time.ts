import { TimestampNumber } from "./timestamp";

export function getRoundedTime(precisionSeconds: number = 1): Date {
    const milliseconds = new Date().getTime();
    const precisionMS = 1000 * precisionSeconds;
    const rounded = Math.floor(milliseconds / precisionMS) * precisionMS;
    return new Date(rounded)
}

export function timestampToDate(n: TimestampNumber | null): Date | null {
    return (n != null) ? new Date(n) : null;
}

export function dateToTimestamp(d: Date | null): TimestampNumber | null {
    return (d != null) ? d.getTime() : null;
}