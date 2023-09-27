/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
    if (chars.length <= 1) {
        return chars.length;
    }

    let charCount = 1;
    let currentChar = chars[0];
    let nextWriteIndex = 1;

    for (let i = 1; i < chars.length; i++) {
        if (chars[i] !== currentChar) {
            if (charCount > 1) {
                let charCountString = charCount.toString();
                for (const c of charCountString) {
                    chars[nextWriteIndex] = c;
                    nextWriteIndex++;
                }
            }
            // Now designate the next character
            chars[nextWriteIndex] = chars[i];
            nextWriteIndex++;
            charCount = 1;
            currentChar = chars[i];
        }
        else {
            charCount++;
        }
    }

    // Write the last compression info
    if (charCount > 1) {
        let charCountString = charCount.toString();
        for (const c of charCountString) {
            chars[nextWriteIndex] = c;
            nextWriteIndex++;
        }
    }
    chars.splice(nextWriteIndex);

    return chars.length;
};

console.log(compress(["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]));