
// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
    let treeList1 = [];
    let treeList2 = [];

    treeList1 = preOrder(p, treeList1);
    treeList2 = preOrder(q, treeList2);

    if (treeList1.length === treeList2.length) {
        let allEqual = true;
        for (let i = 0; i < treeList1.length; i++) {
            allEqual = allEqual && treeList1[i] === treeList2[i]
        }
        return allEqual;
    }
    else {
        return false;
    }
};

var preOrder = function (t, nodeList) {
    if (!t) {
        nodeList.push(null);
    }
    else {
        nodeList.push(t.val);
        nodeList = preOrder(t.left, nodeList);
        nodeList = preOrder(t.right, nodeList);
    }
    return nodeList;
}

let p = new TreeNode(1, new TreeNode(2), new TreeNode(3));

let q = new TreeNode(1, new TreeNode(2), new TreeNode(3));

console.log(isSameTree(p, q));
