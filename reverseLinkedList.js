
//Definition for singly-linked list.
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

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

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
    let i = 1;
    let currentNode = head;
    let nodeStack = [];
    let valueStack = [];

    while (i < left) {
        currentNode = currentNode.next;
        i++
    }


    while (i <= right) {
        let curry = (node) => {
            return () => node;
        };

        nodeStack.push(curry(currentNode));
        valueStack.push(currentNode.val);

        currentNode = currentNode.next;
        i++
    }

    nodeStack.forEach((fn, index) => {
        let node = fn();
        node.val = valueStack[valueStack.length - index - 1];
    })

    return head;
};

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
let reverseBetween2Ptrs = (head, left, right) => {
    if (!head || left === right) {
        return head;
    }

    // Create a "dummy node ahead of the head for edge case handling"
    const dummy = new ListNode(0, head);
    let prev = dummy;

    // Iterate to the left flank
    for (let i = 1; i < left; i++) {
        prev = prev.next;
    }

    // Create a new pointer for the node being reversed
    let cur = prev.next;
    for (let i = 0; i < right - left; i++) {
        // Reverse the pointers 
        const temp = cur.next;
        cur.next = temp.next;
        temp.next = prev.next;
        prev.next = temp;
    }
    return dummy.next;
}

let inputList = arrayToList([1, 2, 3, 4, 5]);

console.log(linkedListToArray(reverseBetween(inputList, 2, 4)))