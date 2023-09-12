


/**
 * @param {string} s
 * @return {number}
 */
var minimumKeypresses = function (s) {
    const buckets =
    {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: []
    }
    let sArr = [...s];
    let occurences = countOccurences(sArr);

    sArr.sort((a, b) => occurences[b] - occurences[a]);

    let letterToBucket = {}
    for (const char of sArr) {
        // Get the shortest bucket of chars
        if (!letterToBucket[char]) {
            let bucket = Object.keys(buckets).reduce((smallest, b) => buckets[b].length < buckets[smallest].length ? b : smallest);
            letterToBucket[char] = bucket;
            buckets[bucket].push(char);
        }
    }

    // Calculate key presses:
    let cost = 0;
    for (const char of sArr) {
        let bucket = letterToBucket[char];
        cost += buckets[bucket].indexOf(char) + 1;
    }

    return cost;
};

function countOccurences(sArr) {
    let occurences = {};
    sArr.forEach(char => {
        if (occurences[char]) {
            occurences[char]++;
        }
        else {
            occurences[char] = 1;
        }
    })

    return occurences;
}

console.log(minimumKeypresses("aaaaaaaabcdefgggghijkllllllllllmmmnoppponono"));