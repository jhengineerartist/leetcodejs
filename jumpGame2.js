/**
 * You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].
*  
*  Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:
*  
*  0 <= j <= nums[i] and
*  i + j < n
*  Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].
 */



/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    if (!nums || nums.length <= 1) {
        return 0;
    }
    let step = 1;
    let stepStart = 1;
    let maxReachableNextStep = nums[0];
    while (maxReachableNextStep < nums.length - 1 && stepStart < nums.length) {
        let maxReachableCurrentStep = maxReachableNextStep;
        while (stepStart <= maxReachableCurrentStep) {
            maxReachableNextStep = nums[stepStart] + stepStart > maxReachableNextStep ? nums[stepStart] + stepStart : maxReachableNextStep;
            stepStart++;
        }
        step++;
    }

    return step;
};

console.log(jump([2, 3, 1, 1, 4]));