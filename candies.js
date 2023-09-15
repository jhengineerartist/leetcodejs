/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
    let memoization = {}
    let candiesPerChild = []
    for (let i = 0; i < ratings.length; i++) {
        candiesPerChild.push(CandiesSubProb(ratings, i, memoization))
    }

    let total = candiesPerChild.reduce((sum, current) => sum + current, 0);
    return total;
};

let CandiesSubProb = (ratings, i, memo) => {
    if (i < 0 || i >= ratings.length) {
        return 0;
    }
    let largerThanLeft = ratings[i - 1] !== undefined && ratings[i - 1] < ratings[i];
    let largerThanRight = ratings[i + 1] !== undefined && ratings[i + 1] < ratings[i];
    if (!memo[i]) {
        if (!largerThanLeft && !largerThanRight) {
            memo[i] = 1;
        }
        else {
            let minLeft = 1;
            let minRight = 1;
            if (largerThanLeft) {
                minLeft = 1 + CandiesSubProb(ratings, i - 1, memo);
            }
            if (largerThanRight) {
                minRight = 1 + CandiesSubProb(ratings, i + 1, memo);
            }
            memo[i] = Math.max(minLeft, minRight);
        }
    }
    return memo[i];
}
console.log(candy([1, 0, 2]))