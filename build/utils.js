"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.getLocation = exports.getMessage = void 0;
const getMessage = (messages) => {
    let arrMessageFinal = [];
    let majorLength = messages.reduce((a, b) => (a < b.length) ? b.length : a, 0);
    for (let i = 0; i < majorLength; i++) {
        for (const message of messages) {
            arrMessageFinal[i] = (message[i] && message[i].length > 0) ? message[i] : arrMessageFinal[i];
        }
    }
    return arrMessageFinal.join(' ');
};
exports.getMessage = getMessage;
const getLocation = (distances) => {
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
    let resultCoordenadas = {
        x: 1,
        y: 2
    };
    return resultCoordenadas;
};
exports.getLocation = getLocation;
const isNumber = (string) => {
    const value = parseFloat(string);
    return !isNaN(value);
};
exports.isNumber = isNumber;
