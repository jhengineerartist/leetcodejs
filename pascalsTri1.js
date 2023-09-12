/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    let tabulation = [];

    for (let level = 0; level < numRows; level++) {
        for (let xOffset = 0; xOffset <= level; xOffset++) {
            if (!tabulation[level]) {
                tabulation[level] = []
            }
            if (xOffset === 0 || xOffset === level) {
                tabulation[level][xOffset] = 1;
            }
            else if (!tabulation[level][xOffset]) {
                let left = tabulation[level - 1][xOffset - 1];
                let right = tabulation[level - 1][xOffset];
                tabulation[level][xOffset] = left + right;
            }
        }
    }

    return tabulation;
};

console.log(generate(5));