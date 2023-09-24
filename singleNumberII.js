/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let numCountMap = new Map();

    nums.forEach(n => {
        if (numCountMap.has(n)) {
            numCountMap.set(n, numCountMap.get(n) + 1);
        }
        else {
            numCountMap.set(n, 1);
        }
    });

    let arr = Array.from(numCountMap);

    let number = arr.reduce((accumulator, [key, value]) => {
        return value === 1 ? key : accumulator;
    }, 0)

    return number;
};

console.log(singleNumber([30000, 500, 100, 30000, 100, 30000, 100]));