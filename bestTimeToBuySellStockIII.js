/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let leftProfits = new Array(prices.length).fill(0);
    let rightProfits = new Array(prices.length + 1).fill(0);
    let leftMin = prices[0];
    let rightMax = prices[prices.length - 1]
    let i = 1;
    for (let i = 1; i < prices.length; i++) {
        leftProfits[i] = Math.max(leftProfits[i - 1], prices[i] - leftMin);
        leftMin = Math.min(leftMin, prices[i]);

        let rightIndex = prices.length - 1 - i;
        rightProfits[rightIndex] = Math.max(rightProfits[rightIndex + 1], rightMax - prices[rightIndex]);
        rightMax = Math.max(rightMax, prices[rightIndex]);
    }

    let profit = 0;

    for (let i = 0; i < prices.length; i++) {
        profit = Math.max(profit, leftProfits[i] + rightProfits[i + 1])
    }

    return profit;
};


console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]));