
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}


/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    if (!lists || lists.length === 0) {
        return null;
    }
    let combinedList = lists.shift();
    while (lists.length > 0) {
        combinedList = mergeTwoLists(combinedList, lists.shift())
    }
    return combinedList;
};

let mergeTwoLists = (list1, list2) => {
    if ((!list1 && !list2) || (list1?.length === 0 && list2?.length === 0)) {
        return null;
    }
    if (!list1 || list1.length === 0) {
        return list2;
    }
    if (!list2 || list2.length === 0) {
        return list1;
    }

    let node = null;
    if (list1.val <= list2.val) {
        node = list1;
        node.next = mergeTwoLists(list1.next, list2);
    }
    else {
        node = list2;
        node.next = mergeTwoLists(list1, list2.next);
    }

    return node;
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


let list1 = arrayToList([1])

console.log(linkedListToArray(mergeKLists([null, list1])));

