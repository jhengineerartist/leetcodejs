/**
 * @param {string[]} logs
 * @return {string[]}
 */
var reorderLogFiles = function (logs) {
    const numlogs = [];
    const charlogs = [];

    logs.forEach(log => {
        const logLine = log.split(" ");
        if (Number.isInteger(parseInt(logLine[1]))) {
            numlogs.push(log);
        }
        else {
            charlogs.push(log);
        }
    });

    let compareLexical = (log1, log2) => {
        const log1strArr = log1.split(" ");
        const log1prefix = log1strArr.shift();

        const log2strArr = log2.split(" ");
        const log2prefix = log2strArr.shift();

        let largerEndIndex = log1strArr.length > log2strArr.length ? log1strArr.length : log2strArr.length;
        for (let i = 0; i < largerEndIndex; i++) {
            // This case means log1 is longer than log2
            if (log1strArr[i] === undefined) {
                return -1;
            }
            else if (log2strArr[i] === undefined) {
                return 1;
            }
            if (log1strArr[i] < log2strArr[i]) {
                return -1;
            }
            else if (log1strArr[i] > log2strArr[i]) {
                return 1;
            }
            // move onto the next character otherwise.
        }

        if (log1prefix < log2prefix) {
            return -1;
        }
        else if (log1prefix > log2prefix) {
            return 1;
        }
        else {
            return 0;
        }
    }

    charlogs.sort(compareLexical);

    return [...charlogs, ...numlogs];
};