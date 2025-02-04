function processData(input) {
    let s = "";
    let stack = [];
    let lines = input.split("\n");
    let output = [];

    for (let i = 1; i < lines.length; i++) {
        let parts = lines[i].split(" ");
        let op = parts[0];

        if (op === "1") {
            stack.push(s);
            s += parts[1];
        } else if (op === "2") {
            stack.push(s);
            s = s.slice(0, -parseInt(parts[1]));
        } else if (op === "3") {
            output.push(s[parseInt(parts[1]) - 1]);
        } else if (op === "4") {
            s = stack.pop();
        }
    }

    console.log(output.join("\n"));
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
