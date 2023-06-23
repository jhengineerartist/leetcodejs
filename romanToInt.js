/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    let [hasHitVX, hasHitLC, hasHitDM] = Array(3).fill(false);
    let value = 0;
    let i = s.length - 1;
    while (i >= 0) {
        switch (s.charAt(i)) {
            case 'I':
                value += hasHitVX ? -1 : 1;
                break;
            case 'V':
                value += 5;
                hasHitVX = true;
                break;
            case 'X':
                value += hasHitLC ? -10 : 10;
                hasHitVX = true;
                break;
            case 'L':
                value += 50;
                hasHitLC = hasHitVX = true;
                break;
            case 'C':
                value += hasHitDM ? -100 : 100;
                hasHitLC = hasHitVX = true;
                break;
            case 'D':
                value += 500;
                hasHitDM = hasHitLC = hasHitVX = true;
                break;
            case 'M':
                value += 1000;
                hasHitDM = hasHitLC = hasHitVX = true;
                break;
            default:
                console.log(`Invalid roman numeral ${s}`);
        }
        i--;
    }
    return value;
};

console.log(romanToInt("I"));
console.log(romanToInt("III"));
console.log(romanToInt("IV"));
console.log(romanToInt("IX"));
console.log(romanToInt("XI"));
console.log(romanToInt("CL"));
console.log(romanToInt("LVIII"));
console.log(romanToInt("MCMXCIV"));