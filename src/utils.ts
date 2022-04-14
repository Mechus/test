import { Messages, Position } from "./types";

export const getMessage = (messages: Messages[]): string => {
    let arrMessageFinal: string[] = [];
    let majorLength: number = messages.reduce((a,b) => (a < b.length) ? b.length : a,0)

    for(let i = 0; i < majorLength; i++){
        for (const message of messages) {
            arrMessageFinal[i] = (message[i] && message[i].length > 0) ? message[i] : arrMessageFinal[i];
        }
    }

    return arrMessageFinal.join(' ');
};

export const getLocation = (distances: number[]): Position => {
    /*const kenobi: Coordenadas ={
        x: -500,
        y: -200
    };
    const skywalker: Coordenadas ={
        x: 100,
        y: 100
    };
    const sato: Coordenadas ={
        x: 500,
        y: 100
    };*/

    console.log(distances);
    let resultCoordenadas : Position = {
            x: 1,
            y: 2
    };

    return resultCoordenadas;
};

 export const isNumber = (string:string):boolean => {
     const value = parseFloat(string)
    return !isNaN(value);
 }