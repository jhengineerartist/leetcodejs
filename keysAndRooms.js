/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
    let visited = new Set();
    let keys = rooms[0];
    visited.add(0);

    while (keys.length > 0 && visited.size < rooms.length) {
        let newKeyBag = []
        while (keys.length > 0) {
            // grab the next key from the bag
            let k = keys.shift();
            // Add all new keys from room k
            rooms[k].forEach(key => {
                if (!visited.has(key)) {
                    newKeyBag.push(key);
                }
            })
            // mark room k as visited
            visited.add(k);
        }
        keys = newKeyBag;
    }

    return visited.size === rooms.length;
};

console.log(canVisitAllRooms([[1], [2], [3], []]));