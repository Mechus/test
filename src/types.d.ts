export type Messages = string[];

export interface Satellites {
    name: string,
    distance: number,
    message: Messages
};

export interface Position {
    x: number,
    y: number
};