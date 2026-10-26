/**
 * @param {number} k
 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
    minDiff(k, arr) {
        let n = arr.length;
        let preMax = new Array(n);
        let preMin = new Array(n);
        let sufMax = new Array(n);
        let sufMin = new Array(n);
        preMax[0] = preMin[0] = arr[0];
        for (let i = 1; i < n; i++) {
            preMax[i] = Math.max(preMax[i - 1], arr[i]);
            preMin[i] = Math.min(preMin[i - 1], arr[i]);
        }
        sufMax[n - 1] = sufMin[n - 1] = arr[n - 1];
        for (let i = n - 2; i >= 0; i--) {
            sufMax[i] = Math.max(sufMax[i + 1], arr[i]);
            sufMin[i] = Math.min(sufMin[i + 1], arr[i]);
        }
        let m = n - k;
        let ans = Number.MAX_SAFE_INTEGER;
        for (let left = 0; left <= m; left++) {
            let right = left + k;
            let curMax, curMin;
            if (left === 0) {
                curMax = sufMax[right];
                curMin = sufMin[right];
            } else if (right === n) {
                curMax = preMax[left - 1];
                curMin = preMin[left - 1];
            } else {
                curMax = Math.max(preMax[left - 1], sufMax[right]);
                curMin = Math.min(preMin[left - 1], sufMin[right]);
            }
            ans = Math.min(ans, curMax - curMin);
        }
        return ans;
    }
}