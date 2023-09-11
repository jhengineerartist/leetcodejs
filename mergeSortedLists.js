
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}


/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

// We need a self-balancing data structure like an AVL tree
var mergeKLists = function (lists) {
    let populated = false;
    let listCollection = lists;
    let outputList = new ListNode();
    let iterator = outputList;

    listCollection = listCollection.filter(element => {
        return (element?.val !== undefined)
    })

    while (listCollection.length > 0) {
        populated = true;
        listCollection.sort((l1, l2) => {
            return l1.val - l2.val
        });
        iterator.val = listCollection[0].val;
        if (listCollection[0].next) {
            listCollection[0] = listCollection[0].next;
        }
        else {
            listCollection.shift();
        }
        if (listCollection.length > 0) {
            iterator.next = new ListNode()
            iterator = iterator.next;
        }
    }

    return populated ? outputList : null;
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


let list1 = arrayToList([1])

console.log(linkedListToArray(mergeKLists([null, list1])));

