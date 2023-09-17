class BSTNode {
    /**
     * @param {number} val 
     * @param {BSTNode} left 
     * @param {BSTNode} right 
     * @param {number} height 
     */
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    get height() {
        let height = 1;
        if (this.left && this.right) {
            height = 1 + Math.max(this.right.height, this.left.height);
        }
        else if (this.left) {
            height = 1 + this.left.height;
        }
        else if (this.right) {
            height = 1 + this.right.height;
        }
        return height;
    }

    get balance() {
        let rHeight = this.right ? this.right.height : 0;
        let lHeight = this.left ? this.left.height : 0;
        return rHeight - lHeight;
    }

    rotateLeft() {
        let oldRight = this.right;
        // Maintain balance by giving an item that was smaller than right, but larger
        // than "this" as the "new" right of "this" node
        this.right = oldRight.left;
        oldRight.left = this;
        return oldRight;
    }

    rotateRight() {
        let oldLeft = this.left;
        // Maintain balance by giving an item that was larger than left, but smaller
        // than "this" as the "new" left of "this" node
        this.left = oldLeft.right;
        oldLeft.right = this;
        return oldLeft;
    }

    rotateLeftThenRight() {
        this.left = this.left.rotateLeft();
        return this.rotateRight();
    }

    rotateRightThenLeft() {
        this.right = this.right.rotateRight();
        return this.rotateLeft();
    }

    // < -1 implies the left side is larger than the right, we need to rotate to the right.
    // -1, 0, 1 implies balance
    // > 1 implies the right side is larger than the left, we need to rotate from the left
    rebalance() {
        let root = this;
        // If we are unbalanced (not -1, 0, or 1, then rotate from where we can rebalance)
        if (this.balance < -1 && this.left.balance === -1) {
            root = this.rotateRight()
        }
        else if (this.balance > 1 && this.right.balance === 1) {
            root = this.rotateLeft();
        }
        else if (this.balance < -1 && this.left.balance === 1) {
            root = this.rotateLeftThenRight();
        }
        else if (this.balance > 1 && this.right.balance === -1) {
            root = this.rotateRightThenLeft();
        }
        return root;
    }

    find(value) {
        let node = null;
        if (value === this.val) {
            node = this;
        }
        else if (value < this.val && this.left) {
            node = this.left.find()
        }
        else if (value > this.val && this.right) {
            node = this.right.find()
        }
        return node;
    }

    insert(value) {
        if (!this.find(value)) {
            if (value < this.val) {
                if (this.left) {
                    this.left = this.left.insert(value);
                }
                else {
                    this.left = new BSTNode(value);
                }
            }
            if (value > this.val) {
                if (this.right) {
                    this.right = this.right.insert(value);
                }
                else {
                    this.right = new BSTNode(value);
                }
            }
        }
        return this.rebalance();
    }
}

let node = new BSTNode(0);

let i = 1;

while (i <= 500) {
    node = node.insert(i);
    i++;
}

console.log(node.balance)