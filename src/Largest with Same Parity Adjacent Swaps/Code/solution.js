/**
 * @param {number[]} arr
 * @return {number[]}
 */
class Solution {
    lexicographicallyLargest(arr) {
        let n = arr.length;
        let i = 0;
        while (i < n) {
            let j = i;
            while (j + 1 < n && (arr[j] % 2 === arr[j + 1] % 2)) {
                j++;
            }
            let segment = arr.slice(i, j + 1);
            segment.sort((a, b) => b - a);
            for (let k = 0; k < segment.length; k++) {
                arr[i + k] = segment[k];
            }
            i = j + 1;
        }
        return arr;
    }
}