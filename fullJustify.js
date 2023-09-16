/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
    let remainingWords = [...words];
    let lineWords = [];
    let neededLength = 0;

    // First get the words into their lines
    let line = 0;
    while (remainingWords.length > 0) {
        lineWords[line] = [];
        while (neededLength < maxWidth && remainingWords.length > 0) {
            const nextWord = remainingWords[0];
            neededLength = neededLength === 0 ? nextWord.length : neededLength + nextWord.length + 1; // include space for the 'space'

            if (neededLength <= maxWidth) {
                lineWords[line].push(nextWord);
                remainingWords.shift();
            }
        }
        neededLength = 0;
        line++;
    }

    // Next determine where the spaces go
    const justified =
        lineWords.map((line, index) => {
            let linestr = '';
            if (index < lineWords.length - 1 && line.length > 1) {
                const charCount = line.reduce((len, word) => len + word.length, 0);
                const buckets = line.length - 1; // How many 'slots' to insert spaces
                const spaces = maxWidth - charCount;
                const leftoverSpaces = spaces % buckets; // We will iterate these into each bucket later
                const spaceCharacters = new Array(Math.floor(spaces / buckets)).fill(' ').join('');
                const spaceCharacterBuckets = new Array(buckets).fill(spaceCharacters);

                let i = 0;
                while (i < leftoverSpaces) {
                    spaceCharacterBuckets[i % spaceCharacterBuckets.length] += ' ' // add a space to each bucket for each leftover space;
                    i++;
                }
                linestr = line.shift();

                i = 0;
                while (line.length > 0) {
                    linestr += spaceCharacterBuckets[i] + line.shift();
                    i++;
                }
            }
            else {
                // left-justify
                linestr = line.shift();
                while (line.length > 0) {
                    linestr += ' ' + line.shift();
                }

                // pad the right side;
                const spaces = new Array(maxWidth - linestr.length).fill(' ').join('');
                linestr += spaces;
            }
            return linestr;
        })

    return justified;
};

console.log(fullJustify(["Science", "is", "what", "we", "understand", "well", "enough", "to", "explain", "to", "a", "computer.", "Art", "is", "everything", "else", "we", "do"], 20));