/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let calculateArea = (index1, index2) => {
        let calcedArea = Math.min(height[index1], height[index2]);
        calcedArea *= Math.abs(index2 - index1);
        return calcedArea;
    }
    let startIndex = 0;
    let endIndex = height.length - 1;

    let maxArea = 0;

    while (startIndex < endIndex) {
        maxArea = Math.max(maxArea, calculateArea(startIndex, endIndex));
        if (height[startIndex] < height[endIndex]) {
            startIndex++;
        }
        else {
            endIndex--;
        }
    }
    return maxArea;
};

