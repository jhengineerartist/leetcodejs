/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    let forward = x;
    let reverse = 0;

    if (forward < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    while (reverse < forward) {
        reverse = reverse * 10 + forward % 10;
        forward = Math.floor(forward / 10);
    }

    return reverse === forward || (Math.floor(reverse / 10) === forward);
};

console.log(isPalindrome(10));

console.log(isPalindrome(1501));