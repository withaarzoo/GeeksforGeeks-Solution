/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
    dominantPairs(arr) {
        const n = arr.length;
        const mid = Math.floor(n / 2);       // split point
        
        // sort left half [0 .. mid)
        const left = arr.slice(0, mid).sort((a, b) => a - b);
        // sort right half [mid .. n)
        const right = arr.slice(mid).sort((a, b) => a - b);
        
        let ans = 0;
        let j = 0;                           // pointer into the right half
        
        // walk through every element of the left half
        for (let i = 0; i < mid; ++i) {
            // advance j while 5 * right[j] is still <= left[i]
            while (j < mid && left[i] >= 5 * right[j]) {
                ++j;
            }
            // all indices from 0 to j-1 form a valid pair with this i
            ans += j;
        }
        return ans;
    }
}