/**
 * Given an array of positive integers nums and a positive integer target, return the minimal length of a 
 * subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.
 */

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    let minIndex = 0;
    let maxIndex = 0;
    let minLegth = 10 ** 5 + 1; // Value explicitly larger than the longest sequence
    let currentSum = nums[0];

    while (maxIndex < nums.length && (minIndex <= maxIndex)) {
        if (currentSum >= target) {
            minLegth = Math.min(minLegth, maxIndex - minIndex + 1);
            currentSum = currentSum - nums[minIndex];
            minIndex++;
        }
        else {
            maxIndex++;
            currentSum = currentSum + nums[maxIndex];
        }
    }

    return minLegth === 10 ** 5 + 1 ? 0 : minLegth;
}

const target = 7;
const nums = [2, 3, 1, 2, 4, 3];
console.log(minSubArrayLen(target, nums))