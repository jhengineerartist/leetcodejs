
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
    const prefixsums = new Map();
    let count = 0;

    let recursivePath = (root, prevSum) => {
        if (root) {
            let currentSum = prevSum + root.val;
            let neededPrefix = currentSum - targetSum;

            if (currentSum === targetSum) {
                count++;
            }

            let waysToPrefixASum = prefixsums.get(neededPrefix);
            if (waysToPrefixASum) {
                count += waysToPrefixASum; // We found a prefix of nodes we can omit to define a path to the current node with a desired sum
            }
            let prevCount = prefixsums.get(currentSum);
            prefixsums.set(currentSum, prevCount ? prevCount + 1 : 1);
            recursivePath(root.left, currentSum);
            recursivePath(root.right, currentSum);
            prefixsums.set(currentSum, prevCount);
        }
    }

    recursivePath(root, 0);
    return count;
};