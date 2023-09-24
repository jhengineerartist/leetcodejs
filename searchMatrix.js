/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    return recurseMatrix(matrix, target, 0, (matrix.length * matrix[0].length) - 1);
};

let recurseMatrix = (matrix, target, lower, upper) => {
    if (lower > upper) {
        return false;
    }
    let halfway = Math.floor((upper + lower) / 2)
    let m = matrix.length;
    let n = matrix[0].length;
    let row = Math.floor((halfway / n));
    let col = halfway % n;

    if (target === matrix[row][col]) {
        return true;
    }
    else if (target > matrix[row][col]) {
        return recurseMatrix(matrix, target, halfway + 1, upper);
    }
    else {
        return recurseMatrix(matrix, target, lower, halfway - 1);
    }
}

console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 50]], 7));