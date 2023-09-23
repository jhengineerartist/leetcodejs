/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let i = 0;
    let minimum = 0;
    let maximum = 0;
    let profit = 0;
    while (i < prices.length - 1) {
        // Search for the next minimum
        while (i < prices.length - 1 && prices[i] >= prices[i + 1]) {
            i++;
        }
        minimum = prices[i];
        // Search for the next maximum
        while (i < prices.length - 1 && prices[i] < prices[i + 1]) {
            i++;
        }
        maximum = prices[i];
        profit += maximum - minimum;
    }
    return profit;
};