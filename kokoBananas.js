/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {

    const canEatAllBananas = (k) => {
        let totalH = 0;
        // # hours it takes to eat a pile at rate k;
        for (const pile of piles) {
            totalH += Math.ceil(pile / k);
        }

        return totalH <= h;
    }


    // The fastest possible rate is one pile per hour, or k = max(piles[i])
    let rightBound = piles.reduce((largestPile, bananas) => largestPile > bananas ? largestPile : bananas, 0);
    let leftBound = 1; // lowest speed is 1 banana/h

    // in half-sized increments either increase or decrease the speed until we find the slowest k

    while (leftBound < rightBound) {
        let middle = Math.floor((rightBound + leftBound) / 2);
        if (canEatAllBananas(middle)) {
            rightBound = middle;
        }
        else {
            leftBound = middle + 1;
        }
    }
    return left;
};

console.log(minEatingSpeed([312884470], 312884469));