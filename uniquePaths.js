/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    let tabRows = new Array(n);
    let table = new Array(m).fill(tabRows);

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (row === 0 || col === 0) {
                table[row][col] = 1 // leftmost and topmost have only 1 way to access
            }
            else {
                // The top row has 0 ways to have arrived from above.
                let upperWays = table[row - 1][col];
                // leftmost col has 0 ways to have arrived from the left
                let leftWays = table[row][col - 1];
                table[row][col] = upperWays + leftWays;
            }
        }
    }

    console.log(table);
    return table[m - 1][n - 1];
};