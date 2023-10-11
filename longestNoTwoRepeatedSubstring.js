/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let i = 0;
    let j = 0;
    let containerSet = new Map();
    let maxSubstring = s.length > 0 ? 1 : 0;

    while (j < s.length) {
        if (containerSet.has(s[j])) {
            while (i < containerSet.get(s[j]) + 1) {
                containerSet.delete(s[i]);
                i++;
            }
        }
        containerSet.set(s[j], j);
        j++;
        maxSubstring = Math.max(maxSubstring, j - i);
    }

    return maxSubstring;
};