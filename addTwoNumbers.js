
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let carry = 0;
    let value = 0;
    let node1 = l1;
    let node2 = l2;
    const startNode = new ListNode();
    let currentNode = startNode;

    while (node1 || node2 || carry > 0) {
        const value1 = node1 ? node1.val : 0;
        const value2 = node2 ? node2.val : 0;
        value = value1 + value2 + carry;
        carry = value > 9 ? Math.floor(value / 10) : 0;
        value = value % 10;

        currentNode.val = value;

        if ((node1 && node1.next) || (node2 && node2.next) || (carry > 0)) {
            currentNode.next = new ListNode();
            currentNode = currentNode.next;
        }

        node1 = node1 ? node1.next : node1;
        node2 = node2 ? node2.next : node2;
    }

    return startNode;
};

function arrayToList(array) {
    const list = array.reduceRight((next, num) => {
        const node = new ListNode(num);
        node.next = next;
        return node;
    }, null);
    return list;
}


function linkedListToArray(head) {
    const result = [];
    let current = head;

    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }

    return result;
}


const sevenNines = arrayToList([9, 9, 9, 9, 9, 9, 9]);
const fourNines = arrayToList([9, 9, 9, 9]);

console.log(linkedListToArray(addTwoNumbers(sevenNines, fourNines)));