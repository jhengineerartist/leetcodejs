/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    let tab = new Array(nums.length - 1);
    tab[nums.length - 1] = 0;

    if (nums.length > 1) {

    }


    return canJumpRecursive(nums, 0, memo);
};

function canJumpRecursive(nums, strt, memo) {
    let can_jump = nums[strt] >= nums.length - 1;
    if (strt == nums.length - 1) {
        memo[strt] = 0;
    }
    else if (can_jump) {
        memo[strt] = 1;
    }

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