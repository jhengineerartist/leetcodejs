/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let tempGrid = [...grid];
    let adjacencies = [[0, -1], [-1, 0], [1, 0], [0, 1]]
    let islands = 0;

    let demarkateIsland = (locX, locY) => {
        let islandQueue = []
        // Start marking the limits of the island
        islandQueue.push([locX, locY]);
        tempGrid[locX][locY] = '#'; // Mark traversed nodes with '#'
        while (islandQueue.length > 0) {
            let [x, y] = islandQueue.shift();

            adjacencies.forEach(([offsetX, offsetY]) => {
                let row = tempGrid[x + offsetX];
                if (row && row[y + offsetY] === '1') {
                    tempGrid[x + offsetX][y + offsetY] = '#';
                    islandQueue.push([x + offsetX, y + offsetY]);
                }
            })
        }
    }

    for (let m = 0; m < grid.length; m++) {
        for (let n = 0; n < grid[m].length; n++) {
            // Scan for an island
            if (grid[m][n] === '1') {
                islands++;
                demarkateIsland(m, n);
            }
        }
    }

    return islands;
};

console.log(numIslands([["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]));