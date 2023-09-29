/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
    let minSumPath = [[]];
    minSumPath[0][0] = triangle[0][0];

    let level = 1;
    while (level < triangle.length) {
        minSumPath[level] = []
        for (let i = 0; i < triangle[level].length; i++) {
            let upperPathLeft = minSumPath[level - 1][i - 1];
            let upperPathRight = minSumPath[level - 1][i];
            if (upperPathLeft === undefined) {
                minSumPath[level][i] = triangle[level][i] + upperPathRight
            }
            else if (upperPathRight === undefined) {
                minSumPath[level][i] = triangle[level][i] + upperPathLeft;
            }
            else {
                minSumPath[level][i] = triangle[level][i] + Math.min(upperPathLeft, upperPathRight);
            }
        }
        level++;
    }
    console.log(minSumPath);
    return minSumPath[minSumPath.length - 1].reduce((min, current) => current < min ? current : min, Number.MAX_SAFE_INTEGER);
};