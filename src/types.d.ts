//Tipo para conjunto de mensajes de satelites
export type Messages = string[];

//Interface para request de satelites
export interface Satellites {
    name: string,
    distance: number,
    message: Messages
};

export interface Position {
    x: number,
    y: number
};