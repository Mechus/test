"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.getLocation = exports.getMessage = void 0;
const config_1 = __importDefault(require("config"));
var nerdamer = require('nerdamer/all.min');
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
    try {
        const equationKenobi = '(' + distances[0] + ')^2 = (x-(' + config_1.default.get('satellites.kenobi.x') + '))^2 + (y-(' + config_1.default.get('satellites.kenobi.y') + '))^2';
        const equationSkywalker = '(' + distances[1] + ')^2 = (x-(' + config_1.default.get('satellites.skywalker.x') + '))^2 + (y-(' + config_1.default.get('satellites.skywalker.y') + '))^2';
        const equationSato = '(' + distances[2] + ')^2 = (x-(' + config_1.default.get('satellites.sato.x') + '))^2 + (y-(' + config_1.default.get('satellites.sato.y') + '))^2';
        let solXKenobi = nerdamer.solveEquations(equationKenobi, 'x');
        let solYSkywalker = nerdamer.solveEquations(equationSkywalker, 'y');
        let solYKenobiSkywalker = 'y = ' + solYSkywalker[0].toString().replace(/x/g, '(' + solXKenobi[0].toString() + ')');
        const solYFinalKS = nerdamer.solveEquations(solYKenobiSkywalker, 'y');
        if (isValidNumber(solYFinalKS[0])) {
            let solXKenobiSkywalker = solXKenobi[0].toString().replace(/y/g, '(' + solYFinalKS[0].toString() + ')');
            const solXFinalKS = nerdamer.solveEquations(solXKenobiSkywalker, 'x');
            if (isValidNumber(solXFinalKS[0])) {
                return {
                    x: nerdamer(solXFinalKS[0].toString()).evaluate().text(),
                    y: nerdamer(solYFinalKS[0].toString()).evaluate().text()
                };
            }
        }
        let solYSato = nerdamer.solveEquations(equationSato, 'y');
        let solYKenobiSato = solYSkywalker[0].toString().replace(/x/g, '(' + solXKenobi[0].toString() + ')');
        const solYFinalKSa = nerdamer.solveEquations(solYKenobiSato, 'y');
        if (isValidNumber(solYFinalKSa[0])) {
            let solXKenobiSato = solYSato[0].toString().replace(/y/g, '(' + solYFinalKSa[0].toString() + ')');
            const solXFinalKSa = nerdamer.solveEquations(solXKenobiSato, 'x');
            if (isValidNumber(solXFinalKSa[0])) {
                return {
                    x: nerdamer(solXFinalKSa[0].toString()).evaluate().text(),
                    y: nerdamer(solYFinalKSa[0].toString()).evaluate().text()
                };
            }
        }
        return undefined;
    }
    catch (error) {
        return undefined;
    }
};
exports.getLocation = getLocation;
const isNumber = (string) => {
    const value = parseFloat(string);
    return !isNaN(value);
};
exports.isNumber = isNumber;
const isValidNumber = (equation) => {
    return !(equation.imaginary || equation.isInfinity || equation.value.includes('i'));
};
