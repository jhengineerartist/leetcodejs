/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    let buckets = []

    let generateDictionary = (str) => {
        let dict = {};
        str.split('').forEach(c => {
            dict[c] = dict[c] === undefined ? 1 : dict[c] + 1;
        })
        return dict;
    }

    let compareDicts = (dict1, dict2) => {
        let areEqual = Object.keys(dict1).length === Object.keys(dict2).length;
        if (areEqual) {
            Object.keys(dict1).forEach(c => {
                areEqual = areEqual && dict2[c] === dict1[c];
            })
        }
        return areEqual;
    }

    strs.forEach(str => {
        let dict = generateDictionary(str);
        let foundBucket = buckets.find(item => {
            return compareDicts(item.d, dict);
        })

        if (foundBucket) {
            foundBucket.bucket.push(str);
        }
        else {
            buckets.push({ d: dict, bucket: [str] });
        }
    });

    return buckets.map(b => b.bucket);
};


console.log(groupAnagrams(["", "b"]));