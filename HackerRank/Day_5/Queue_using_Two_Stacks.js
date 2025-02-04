function processData(input) {
    const lines = input.split("\n");
    const q = parseInt(lines[0]);

    const stack1 = [];
    const stack2 = [];

    let index = 1;
    for (let i = 0; i < q; i++) {
        const query = lines[index].split(" ");
        index++;

        if (query[0] === "1") {
            stack1.push(parseInt(query[1]));
        } else if (query[0] === "2") {
            if (stack2.length === 0) {
                while (stack1.length > 0) {
                    stack2.push(stack1.pop());
                }
            }
            stack2.pop();
        } else if (query[0] === "3") {
            if (stack2.length === 0) {
                while (stack1.length > 0) {
                    stack2.push(stack1.pop());
                }
            }
            console.log(stack2[stack2.length - 1]);
        }
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
