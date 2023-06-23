
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
* @param {TreeNode} root
* @return {number[]}
*/
var inorderTraversal = function (root) {
    let traversal = [];
    if (root != null) {
        traversal = [root.val];
        if (root.left != null) {
            traversal = [...inorderTraversal(root.left), ...traversal];
        }
        if (root.right != null) {
            traversal = [...traversal, ...inorderTraversal(root.right)];
        }
    }
    return traversal;
};

TreeNode(3,)