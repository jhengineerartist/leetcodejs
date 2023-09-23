function LRUNode(key, data, next, prev) {
    this.key = key;
    this.data = data;
    this.next = typeof (next) === 'object' ? next : null;
    this.prev = typeof (prev) === 'object' ? prev : null;
}
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.cacheMap = {};
    this.cacheHead = null;
    this.cacheTail = null;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    let node = this.getNode(key);
    return node ? node.data : -1;
};

/** 
 * @param {number} key
 * @return {LRUNode}
 */
LRUCache.prototype.getNode = function (key) {
    let nodeWrapper = this.cacheMap[key];
    let node = null;
    if (nodeWrapper !== undefined) {
        node = nodeWrapper();
        // Just return the the head if the key is already at the front of the list
        if (node.key !== this.cacheHead.key) {
            // Special tail case, since we're moving the LRU
            // to the front, set the tail to the previous LRU.
            // and only if the tail and head are not the same 
            // (ie. a single value cache)
            if (node.key === this.cacheTail.key) {
                this.cacheTail = node.prev;
            }
            // Pull the node out of the LL and
            // stitch it back together
            let tempNext = node.next;
            let tempPrev = node.prev;
            if (tempNext) {
                node.next.prev = tempPrev;
            }
            if (tempPrev) {
                node.prev.next = tempNext;
            }
            node.next = this.cacheHead;
            this.cacheHead.prev = node;
            node.prev = null;
            this.cacheHead = node;
        }
    }
    return node;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {

    // Create a function that can curry the node in and return it on command
    const nodeWrapperFunc = (n) => () => n;
    const nodeWrapper = this.cacheMap[key];
    let node = null;
    if (!nodeWrapper) {

        // If we were already at capcity, remove a node from the cacheList and cacheMap
        if (Object.keys(this.cacheMap).length === this.capacity) {
            delete this.cacheMap[this.cacheTail.key];

            if (this.cacheTail.key !== this.cacheHead.key) {
                this.cacheTail = this.cacheTail.prev;
                this.cacheTail.next = null;
            }
            else {
                // If the head and tail are the same node,
                // which we just deleted, deref both
                this.cacheHead = null;
                this.cacheTail = null;
            }
            // GC deletes old node
        }

        node = new LRUNode(key, value);

        // If this is the first value in the cachemap, also set the current node to the tail.
        if (Object.keys(this.cacheMap).length === 0) {
            this.cacheTail = node;
        }
        // And if not, set the previous cache head to be the next node;
        else {
            node.next = this.cacheHead;
            this.cacheHead.prev = node;
        }

        this.cacheHead = node;
    }
    else {
        // do the getNode just to move the node to the front of the LL
        node = this.getNode(key);
        node.data = value;
    }
    // Finally add the new node to the 
    this.cacheMap[key] = nodeWrapperFunc(node);
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * */

var cache = new LRUCache(2)
cache.put(2, 1)
cache.put(3, 2);
out = cache.get(3);
out = cache.get(2);
cache.put(4, 3);
out = cache.get(2);
out = cache.get(3);
out = cache.get(4);