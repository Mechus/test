import { question, keyIn } from 'readline-sync';
import { Messages, Position } from './types';
import { Satellite } from './enum';
import { isNumber, getLocation, getMessage } from './utils'

function main(): void
{
    const distances: number[] = [];
    const messages: Messages[] = [];
    const satellites: string[] = Object.keys(Satellite);

    for (const sateliteUser of satellites) {

        console.info("\n*** Satellite " + sateliteUser + " information ***\n");
        let nextDistance: boolean = true;
        let distanceUser: string = "";
        while(nextDistance){
            distanceUser = question('- Enter distance of the message: ');
            if(isNumber(distanceUser)) nextDistance = false;
            else console.error('Value is not a number');
        }
        
        let nextWord: string = 'y';
        const messageSatellite: string[] = [];
        while(nextWord.toLowerCase() === 'y'){
            const messsageUser: string = question('- Enter one word of the message: ');
            messageSatellite.push(messsageUser);
            nextWord = keyIn('If you want add other word press Y or N to continue (Y/N): ');
        }

        distances.push(parseFloat(distanceUser));
        messages.push(messageSatellite);
        console.log('\n\n')
    }
    const position: Position | undefined=  getLocation(distances);
    const message: string = getMessage(messages);

    console.info('\nResult of message information\n');
    if((position && message)){
        console.info('Position X: ', position?.x);
        console.info('Position Y: ', position?.y);
        console.info('Message: ', message);
    }else{
        console.error('There is not enough information');
    }
}

main();