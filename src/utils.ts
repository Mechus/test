import { Messages, Position } from "./types";
import satellitesData from './satellites.json';
var nerdamer = require('nerdamer/all.min'); 

//Obtener valores de satelites memoria
const satellitesPosition: any = satellitesData;

//Metodo para obtener el mensaje decifrado de los statelites
export const getMessage = (messages: Messages[]): string => {
    try {
        //Se crean variables y se obtiene el string mas largo para recorrer los mensajes
        let arrMessageFinal: string[] = [];
        let majorLength: number = messages.reduce((a,b) => (a < b.length) ? b.length : a,0)

        for(let i = 0; i < majorLength; i++){
            for (const message of messages) {
                arrMessageFinal[i] = (message[i] && message[i].length > 0) ? message[i] : arrMessageFinal[i];
            }
        }

        return arrMessageFinal.join(' ');
    } catch (error) {
        console.log(error)
        return "";
    }
};

//Metodo para obtener las coordenadas (x,y) del mensaje de los satelites
export const getLocation = (distances: number[]): Position | undefined => {
    try {
        //Se hacen los reemplazos de las variables y constantes en al formula de distancia (d)^2 = sqrt((x1 -x2)^2+(y1 -y2)^2) 
        const equationKenobi = '('+distances[0]+')^2 = (x-('+satellitesPosition.kenobi.x+'))^2 + (y-('+satellitesPosition.kenobi.y+'))^2';
        const equationSkywalker = '('+distances[1]+')^2 = (x-('+satellitesPosition.skywalker.x+'))^2 + (y-('+satellitesPosition.skywalker.y+'))^2';
        const equationSato= '('+distances[2]+')^2 = (x-('+satellitesPosition.sato.x+'))^2 + (y-('+satellitesPosition.sato.x+'))^2';

        //Se despeja X en el primer satelite
        let solXKenobi = nerdamer.solveEquations(equationKenobi,'x');
    
        //Se despeja Y en el segundo satelite
        let solYSkywalker = nerdamer.solveEquations(equationSkywalker,'y');
    
        //Se reemplaza x en la formula de y, se obtiene la coordenada de Y
        let solYKenobiSkywalker = 'y = ' + solYSkywalker[0].toString().replace(/x/g,'('+solXKenobi[0].toString()+')')
        const solYFinalKS = nerdamer.solveEquations(solYKenobiSkywalker,'y');

        //Se valida si la coordenada es valida
        if(isValidNumber(solYFinalKS[0])){
            //Se reemplaza y en la formula de x, se obtiene la coordenada de Y
            let solXKenobiSkywalker = solXKenobi[0].toString().replace(/y/g,'('+solYFinalKS[0].toString()+')')
            const solXFinalKS = nerdamer.solveEquations(solXKenobiSkywalker,'x');
            
            //Se valida si la coordenada es valida
            if(isValidNumber(solXFinalKS[0])){
                return {
                    x: nerdamer(solXFinalKS[0].toString()).evaluate().text(),
                    y: nerdamer(solYFinalKS[0].toString()).evaluate().text()
                };
            }
        }
    
        //Se despeja Y en el tercer satelite
        let solYSato = nerdamer.solveEquations(equationSato,'y');
    
        //Se reemplaza x en la formula de y, se obtiene la coordenada de Y
        let solYKenobiSato = solYSkywalker[0].toString().replace(/x/g,'('+solXKenobi[0].toString()+')')
        const solYFinalKSa = nerdamer.solveEquations(solYKenobiSato,'y');

        //Se valida si la coordenada es valida
        if(isValidNumber(solYFinalKSa[0])){
            let solXKenobiSato = solYSato[0].toString().replace(/y/g,'('+solYFinalKSa[0].toString()+')')
            const solXFinalKSa = nerdamer.solveEquations(solXKenobiSato,'x');
            
            //Se valida si la coordenada es valida
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

//Metodo para verificar si es un number
 export const isNumber = (string:string):boolean => {
     const value = parseFloat(string)
    return !isNaN(value);
 }

//Metodo para verificar si es una coordenada valida
const isValidNumber = (equation:any):boolean => {
    return !(equation.imaginary || equation.isInfinity || equation.value.includes('i'))
}