import { TimestampNumber } from "./timestamp";

export type Trip = {
    id: string;
    vehicleId: string;
    description: string;
    timestampAtBegin?: TimestampNumber | null;
    timestampAtEnd?: TimestampNumber | null;
    odometerAtBegin?: number | null;
    odometerAtEnd?: number | null;
    routeDescription?: string;
};