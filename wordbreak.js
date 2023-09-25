/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    let reachable = new Array(s.length + 1).fill(false);
    reachable[0] = true; // 0 length strings are always reachable;
    let i = 0;
    while (i <= s.length) {
        for (const word of wordDict) {
            let substr = s.substring(i, i + word.length);
            reachable[i + word.length] = reachable[i + word.length] || substr === word;
        }
        i++;
        while (!reachable[i] && i <= s.length) {
            i++;
        }
    }
    return reachable[s.length];
};

console.log(wordBreak("cars", ["car", "ca", "rs"]))