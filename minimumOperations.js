/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
    let opsToConvergeEnds = (subArray) => {
        let areEndsEqual = subArray[0] === subArray[subArray.length - 1];
        let opCount = 0;

        while (!areEndsEqual && subArray.length > 1) {
            if (subArray[0] < subArray[subArray.length - 1]) {
                // Combine both numbers
                let firstNum = subArray.shift()
                subArray[0] += firstNum;
            }
            else {
                let lastNum = subArray.pop();
                subArray[subArray.length - 1] += lastNum;
            }
            opCount++;
            areEndsEqual = subArray[0] === subArray[subArray.length - 1];
        }

        return opCount;
    }

    let isPalendrome = (subArray) => {
        let i = 0;
        let j = subArray.length - 1;
        let foundMisAlignment = subArray[i] !== subArray[j];

        while (!foundMisAlignment && i < j) {
            i++;
            j--;
            foundMisAlignment = subArray[i] !== subArray[j];
        }
        return { isPalen: !foundMisAlignment, offset: i };
    }

    let minOperations = 0;
    let subArray = [...nums];
    let { isPalen, offset } = isPalendrome(subArray);
    while (!isPalen) {
        // Only need to make the non-palendrome portion of a subarray into a palendrome
        subArray = subArray.slice(offset, subArray.length - offset);
        minOperations += opsToConvergeEnds(subArray);
        ({ isPalen, offset } = isPalendrome(subArray));
    }

    return minOperations;
};

console.log(minimumOperations([4, 3, 2, 1, 2, 3, 1]));