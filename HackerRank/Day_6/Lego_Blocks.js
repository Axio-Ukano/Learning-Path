'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function legoBlocks(height, width) {
    const MODULOR = 10n ** 9n + 7n;
    let fibMap = new Map([[0, 1n]]);

    function pow(bigInt, exponent) {
        if (bigInt === 1n) return 1n;
        let result = 1n;
        while (exponent) {
            if (exponent % 2) result = (result * bigInt) % MODULOR;
            bigInt = (bigInt * bigInt) % MODULOR;
            exponent = Math.floor(exponent / 2);
        }
        return result;
    }

    function fillFibMap(newWidth) {
        for (let i = 1; i <= newWidth; i++) {
            if (fibMap.has(i)) continue;
            let previous = [];
            for (let j = 1; j <= 4; j++) {
                if (i - j < 0) break;
                previous.push(fibMap.get(i - j));
            }
            fibMap.set(i, previous.reduce((agg, cur) => agg + cur) % MODULOR);
        }
    }

    function getSafeCount(width) {
        let safeMap = new Map([[1, 1n]]);
        let exponentMap = new Map();

        for (let [key, value] of fibMap) {
            exponentMap.set(key, pow(value, height) % MODULOR);
        }

        for (let i = 2; i <= width; i++) {
            let exponentI = exponentMap.get(i);
            let unSafe = 0n;

            for (let j = 1; j < i; j++) {
                unSafe = (unSafe + safeMap.get(j) * exponentMap.get(i - j)) % MODULOR;
            }

            let safeValue = (exponentI >= unSafe) 
                ? exponentI - unSafe 
                : exponentI + MODULOR - unSafe;

            safeMap.set(i, safeValue % MODULOR);
        }
        return safeMap.get(width);
    }

    fillFibMap(width);
    return Number(getSafeCount(width) % MODULOR);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
        const n = parseInt(firstMultipleInput[0], 10);
        const m = parseInt(firstMultipleInput[1], 10);
        ws.write(legoBlocks(n, m) + '\n');
    }
    ws.end();
}