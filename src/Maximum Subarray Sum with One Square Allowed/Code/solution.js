/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
    maximumSubarray(arr) {
        let n = arr.length;
        let noSq = arr[0];
        let withSq = arr[0] * arr[0];
        let ans = Math.max(noSq, withSq);
        for (let i = 1; i < n; i++) {
            let cur = arr[i];
            let sq = cur * cur;
            let newNo = Math.max(cur, noSq + cur);
            let newWith = Math.max(sq, Math.max(noSq + sq, withSq + cur));
            noSq = newNo;
            withSq = newWith;
            ans = Math.max(ans, Math.max(noSq, withSq));
        }
        return ans;
    }
}