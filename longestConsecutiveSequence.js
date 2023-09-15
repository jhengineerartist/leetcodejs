/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    let numSet = new Set(nums);

    let longest = 0;
    numSet.forEach(setVal => {
        let currentSequenceLength = 0;
        if (!numSet.has(setVal - 1)) {
            let current = setVal;
            while (numSet.has(current)) {
                currentSequenceLength++;
                current++;
            }
            longest = currentSequenceLength > longest ? currentSequenceLength : longest;
        }
    })

    return longest;
};