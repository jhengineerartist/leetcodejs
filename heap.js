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
            // Find the lower priority child and flip it with the index;
            let childIdx = index * 2; // left child
            let canSink =
                this.heapArr[childIdx] !== undefined &&
                this.priorityFn(this.heapArr[childIdx], this.heapArr[index]);
            while (canSink) {
                if (this.heapArr[childIdx + 1] !== undefined &&
                    this.priorityFn(this.heapArr[childIdx + 1], this.heapArr[childIdx])) {
                    childIdx++; // right child if the right node is lower priority.
                }
                // Swap parent and child
                [this.heapArr[index], this.heapArr[childIdx]] = [this.heapArr[childIdx], this.heapArr[index]];
                index = childIdx;
                childIdx = index * 2;
                canSink =
                    this.heapArr[childIdx] !== undefined &&
                    this.priorityFn(this.heapArr[childIdx], this.heapArr[index]);
            }
        }
        else {
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