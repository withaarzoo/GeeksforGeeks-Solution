/**
 * @param {number[]} arr
 * @returns {void}
 */

class Solution {
    sortIt(arr) {
        arr.sort((a, b) => {
            const aOdd = a % 2 !== 0;
            const bOdd = b % 2 !== 0;
            if (aOdd && bOdd) return b - a;
            if (!aOdd && !bOdd) return a - b;
            return aOdd ? -1 : 1;
        });
    }
}