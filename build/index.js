"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = require("readline-sync");
const enum_1 = require("./enum");
const utils_1 = require("./utils");
function main() {
    const distances = [];
    const messages = [];
    const satellites = Object.keys(enum_1.Satellite);
    for (const sateliteUser of satellites) {
        console.info("\n*** Satellite " + sateliteUser + " information ***\n");
        let nextDistance = true;
        let distanceUser = "";
        while (nextDistance) {
            distanceUser = (0, readline_sync_1.question)('- Enter distance of the message: ');
            if ((0, utils_1.isNumber)(distanceUser))
                nextDistance = false;
            else
                console.error('Value is not a number');
        }
        let nextWord = 'y';
        const messageSatellite = [];
        while (nextWord.toLowerCase() === 'y') {
            const messsageUser = (0, readline_sync_1.question)('- Enter one word of the message: ');
            messageSatellite.push(messsageUser);
            nextWord = (0, readline_sync_1.keyIn)('If you want add other word press Y or N to continue (Y/N): ');
        }
        distances.push(parseFloat(distanceUser));
        messages.push(messageSatellite);
        console.log('\n\n');
    }
    const position = (0, utils_1.getLocation)(distances);
    const message = (0, utils_1.getMessage)(messages);
    console.info('\nResult of message information\n');
    if ((position && message)) {
        console.info('Position X: ', position === null || position === void 0 ? void 0 : position.x);
        console.info('Position Y: ', position === null || position === void 0 ? void 0 : position.y);
        console.info('Message: ', message);
    }
    else {
        console.error('There is not enough information');
    }
}
main();
