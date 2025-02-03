function findZigZagSequence(arr) {
    arr.sort((a, b) => a - b);

    let mid = Math.floor(arr.length / 2);
    let temp = arr[mid];

    arr[mid] = arr[arr.length - 1];
    arr[arr.length - 1] = temp;

    let start = mid + 1;
    let end = arr.length - 2;
    while (start < end) {
        let tmp = arr[start];
        arr[start] = arr[end];
        arr[end] = tmp;
        start++;
        end--;
    }

    return arr;
}

function processData(input) {
    let lines = input.split('\n');
    let t = parseInt(lines[0]);
    let lineIndex = 1;

    for (let i = 0; i < t; i++) {
        let n = parseInt(lines[lineIndex]);
        let arr = lines[lineIndex + 1].split(' ').map(Number);

        let result = findZigZagSequence(arr);

        console.log(result.join(' '));

        lineIndex += 2;
    }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});
