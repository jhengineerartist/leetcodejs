/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    let simple_table = {};
    let digit_array = n.toString().split("");
    let is_cyclic = false;
    let is_happy = false;

    while (!is_cyclic && !is_happy) {
        let sum = digit_array.reduce((total, digit) => { return total + digit ** 2 }, 0);
        if (sum in simple_table) {
            is_cyclic = true;
        }
        else if (sum == 1) {
            is_happy = true;
        } else {
            simple_table[sum] = sum;
            digit_array = sum.toString().split("");
        }
    }

    return is_happy
};

console.log(isHappy(9007199254740992));