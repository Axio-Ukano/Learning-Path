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

function caesarCipher(s, k) {
    k = k % 26;
    let result = "";
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        if (char >= 'a' && char <= 'z') {
            let newChar = String.fromCharCode(((char.charCodeAt(0) - 97 + k) % 26) + 97);
            result += newChar;
        } else if (char >= 'A' && char <= 'Z') {
            let newChar = String.fromCharCode(((char.charCodeAt(0) - 65 + k) % 26) + 65);
            result += newChar;
        } else {
            result += char;
        }
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const n = parseInt(readLine().trim(), 10);
    const s = readLine();
    const k = parseInt(readLine().trim(), 10);
    const result = caesarCipher(s, k);
    ws.write(result + '\n');
    ws.end();
}
