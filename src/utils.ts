import { Messages, Position } from "./types";
import satellitesData from './satellites.json';
var nerdamer = require('nerdamer/all.min'); 

const satellitesPosition: any = satellitesData;

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

export const getLocation = (distances: number[]): Position | undefined => {
    try {
        const equationKenobi = '('+distances[0]+')^2 = (x-('+satellitesPosition.kenobi.x+'))^2 + (y-('+satellitesPosition.kenobi.y+'))^2';
        const equationSkywalker = '('+distances[1]+')^2 = (x-('+satellitesPosition.skywalker.x+'))^2 + (y-('+satellitesPosition.skywalker.y+'))^2';
        const equationSato= '('+distances[2]+')^2 = (x-('+satellitesPosition.sato.x+'))^2 + (y-('+satellitesPosition.sato.x+'))^2';

        let solXKenobi = nerdamer.solveEquations(equationKenobi,'x');
    
        let solYSkywalker = nerdamer.solveEquations(equationSkywalker,'y');
    
        let solYKenobiSkywalker = 'y = ' + solYSkywalker[0].toString().replace(/x/g,'('+solXKenobi[0].toString()+')')
        const solYFinalKS = nerdamer.solveEquations(solYKenobiSkywalker,'y');

        if(isValidNumber(solYFinalKS[0])){
            let solXKenobiSkywalker = solXKenobi[0].toString().replace(/y/g,'('+solYFinalKS[0].toString()+')')
            const solXFinalKS = nerdamer.solveEquations(solXKenobiSkywalker,'x');
            
            if(isValidNumber(solXFinalKS[0])){
                return {
                    x: nerdamer(solXFinalKS[0].toString()).evaluate().text(),
                    y: nerdamer(solYFinalKS[0].toString()).evaluate().text()
                };
            }
        }
    
        let solYSato = nerdamer.solveEquations(equationSato,'y');
    
        let solYKenobiSato = solYSkywalker[0].toString().replace(/x/g,'('+solXKenobi[0].toString()+')')
        const solYFinalKSa = nerdamer.solveEquations(solYKenobiSato,'y');

        if(isValidNumber(solYFinalKSa[0])){
            let solXKenobiSato = solYSato[0].toString().replace(/y/g,'('+solYFinalKSa[0].toString()+')')
            const solXFinalKSa = nerdamer.solveEquations(solXKenobiSato,'x');
            
            if(isValidNumber(solXFinalKSa[0])){
                return {
                    x: nerdamer(solXFinalKSa[0].toString()).evaluate().text(),
                    y: nerdamer(solYFinalKSa[0].toString()).evaluate().text()
                };
            }
        }
    
        return undefined;
    } catch (error) {
        return undefined;
    }
};

 export const isNumber = (string:string):boolean => {
     const value = parseFloat(string)
    return !isNaN(value);
 }

const isValidNumber = (equation:any):boolean => {
    return !(equation.imaginary || equation.isInfinity || equation.value.includes('i'))
}