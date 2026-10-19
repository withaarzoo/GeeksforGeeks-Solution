/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
    goodIndices(arr) {
        const n = arr.length;
        const status = new Array(n).fill(0);
        let ans = 0;
        for (let i = 0; i < n; i++) {
            if (status[i] !== 0) continue;
            const path = [];
            let curr = i;
            while (curr >= 0 && curr < n && status[curr] === 0) {
                status[curr] = 1;
                path.push(curr);
                curr += arr[curr];
            }
            let good = false;
            if (curr < 0 || curr >= n) good = true;
            else if (status[curr] === 2) good = true;
            const finalStatus = good ? 2 : 3;
            for (const idx of path) status[idx] = finalStatus;
        }
        for (const s of status) if (s === 2) ans++;
        return ans;
    }
}