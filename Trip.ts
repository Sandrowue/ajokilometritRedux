export type Trip = {
    id: string;
    vehicleId: string;
    description: string;
    timestampAtBegin?: Date | null;
    timestampAtEnd?: Date | null;
    odometerAtBegin?: number | null;
    odometerAtEnd?: number | null;
    routeDescription?: string;
};