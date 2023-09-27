class Heap {
    /**
     * @param {(number, number) => boolean} priorityFn
     */
    constructor(priorityFn) {
        // First value in the array is reserved to maintain the
        // simple arithmetic to calculate child/parent
        this.heapArr = [null];
        this.priorityFn = priorityFn;
    }

    insert(n) {
        this.heapArr.push(n);
        // If the heap is more than a root, perform a heapify up
        if (this.heapArr.length > 2) {
            let index = this.heapArr.length - 1;
            // Iterate while the parent node is lower priority than its child,
            // and the next node is not the reserved space
            let parentIdx = Math.floor(index / 2);
            while (parentIdx > 0 && this.priorityFn(this.heapArr[index], this.heapArr[parentIdx])) {
                // Swap the parent and child
                [this.heapArr[index], this.heapArr[parentIdx]] = [this.heapArr[parentIdx], this.heapArr[index]];
                index = parentIdx;
                parentIdx = Math.floor(index / 2);
            }
        }
    }

    remove() {
        let root = this.heapArr[1];
        if (this.heapArr.length > 2) {
            // swap the top node with the last node
            this.heapArr[1] = this.heapArr.pop();
            let index = 1;
            let childIdx = index * 2; // left child

            while (childIdx <= this.heapArr.length - 1) {
                // Find the higher priority child
                if (
                    childIdx + 1 <= this.heapArr.length - 1 &&
                    this.priorityFn(this.heapArr[childIdx + 1], this.heapArr[childIdx])
                ) {
                    childIdx++; // right child is higher priority
                }

                // Check if the parent has higher priority than the selected child
                if (this.priorityFn(this.heapArr[childIdx], this.heapArr[index])) {
                    // Swap parent and child
                    [this.heapArr[index], this.heapArr[childIdx]] = [this.heapArr[childIdx], this.heapArr[index]];
                    index = childIdx;
                    childIdx = index * 2;
                } else {
                    break; // Parent has higher priority, no need to swap further
                }
            }
        } else {
            // remove the root;
            this.heapArr.pop();
        }

        return root;
    }
    // New method to aesthetically stringify the heap
    toString() {
        return this.stringifyHeap(1, '', true);
    }

    stringifyHeap(index, prefix, isTail) {
        if (index <= this.heapArr.length - 1) {
            const node = this.heapArr[index];
            const leftChildIdx = 2 * index;
            const rightChildIdx = 2 * index + 1;

            let result = '';

            result += prefix + (isTail ? '└── ' : '├── ') + node + '\n';

            const childPrefix = prefix + (isTail ? '    ' : '│   ');

            if (leftChildIdx <= this.heapArr.length - 1) {
                result += this.stringifyHeap(leftChildIdx, childPrefix, false);
            }

            if (rightChildIdx <= this.heapArr.length - 1) {
                result += this.stringifyHeap(rightChildIdx, childPrefix, true);
            }

            return result;
        }

        return '';
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    let heapFn = (a, b) => a > b; // max Heap
    let heap = new Heap(heapFn);

    for (const n of nums) {
        heap.insert(n);
    }

    let kthElem;
    for (let i = 0; i < k; i++) {
        kthElem = heap.remove();
    }

    return kthElem;
};