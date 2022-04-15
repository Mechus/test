import { question, keyIn } from 'readline-sync';
import { Messages, Position } from './types';
import { Satellite } from './enum';
import { isNumber, getLocation, getMessage } from './utils'

function main(): void
{
    try {
        //Declaracion de variables principales
        const distances: number[] = [];
        const messages: Messages[] = [];
        const satellites: string[] = Object.keys(Satellite);

        //Consultar satelites de dominio para consultar informacion
        for (const sateliteUser of satellites) {

            console.info("\n*** Satellite " + sateliteUser + " information ***\n");
            let nextDistance: boolean = true;
            let distanceUser: string = "";
            //Solicitar informacion de distancia hasta que sea un numero valido
            while(nextDistance){
                distanceUser = question('- Enter distance of the message: ');
                //Validar si es numero
                if(isNumber(distanceUser)) nextDistance = false;
                else console.error('Value is not a number');
            }
            
            let nextWord: string = 'y';
            const messageSatellite: string[] = [];
            //Solicitar informacion de mensajes palabra por palabra
            while(nextWord.toLowerCase() === 'y'){
                const messsageUser: string = question('- Enter one word of the message: ');
                //Guardar mpalabra ingresada
                messageSatellite.push(messsageUser);
                //Consutar si se desea ingresar una palabra nueva
                nextWord = keyIn('If you want add other word press Y or N to continue (Y/N): ');
            }

            //Guardar valores obtenidos del satellite
            distances.push(parseFloat(distanceUser));
            messages.push(messageSatellite);
            console.log('\n\n')
        }
        //Obtener calculo de mensajes y coordenadas
        const position: Position | undefined=  getLocation(distances);
        const message: string = getMessage(messages);

        //Imprimir resultados
        console.info('\nResult of message information\n');
        if((position && message)){
            console.info('Position X: ', position?.x);
            console.info('Position Y: ', position?.y);
            console.info('Message: ', message);
        }else{
            console.error('There is not enough information');
        }
    } catch (error) {
        console.error('Inexpected error');
    }
}

//Llamada al metodo principal
main();