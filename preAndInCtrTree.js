/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    let valueToInOrderIndices = {};
    // Build the O(1) lookup table to infer in a node is a left or right subtree
    preorder.forEach((nodeValue) => {
        valueToInOrderIndices[nodeValue] = inorder.indexOf(nodeValue);
    })

    let preIndex = 0;
    let buildRecSubTree = (ioSubTreeLeftFlank, ioSubTreeRightFlank) => {
        if (ioSubTreeLeftFlank > ioSubTreeRightFlank) {
            return null;
        }

        // Push the next root onto the tree
        let root = new TreeNode(preorder[preIndex])
        preIndex++;

        root.left = buildRecSubTree(ioSubTreeLeftFlank, valueToInOrderIndices[root.val] - 1);
        root.right = buildRecSubTree(valueToInOrderIndices[root.val] + 1, ioSubTreeRightFlank);

        return root;
    }

    return buildRecSubTree(0, inorder.length - 1);
};

buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);