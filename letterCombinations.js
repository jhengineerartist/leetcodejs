

const letterMap = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"]
}

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (!digits || digits.length === 0) {
        return [];
    }

    let backPossible = letterCombinations(digits.substring(1));

    let prefix = letterMap[parseInt(digits[0])];

    let combinations = []

    if (backPossible.length > 0) {
        backPossible.forEach(possibility => {
            prefix.forEach(pre => {
                combinations.push(pre + possibility);
            });
        });
    }
    else {
        prefix.forEach(pre => {
            combinations.push(pre);
        });
    }
    return combinations;
};


console.log(letterCombinations("23"))