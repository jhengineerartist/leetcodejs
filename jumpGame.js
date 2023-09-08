/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    let memo = {};
    return canJumpRecursive(nums, 0, memo);
};

function canJumpRecursive(nums, strt, memo) {
    let can_jump = strt + nums[strt] >= nums.length - 1;
    let i = 1;
    while (!can_jump && i <= nums[strt]) {
        if ((i + strt) in memo) {
            can_jump |= memo[i + strt];
        }
        else {
            memo[i + strt] = canJumpRecursive(nums, i + strt, memo);
            can_jump |= memo[i + strt];
        }
        i++;
    }
    memo[strt] = can_jump;
    return can_jump;
};

console.log(canJump([1, 1, 1, 0]));