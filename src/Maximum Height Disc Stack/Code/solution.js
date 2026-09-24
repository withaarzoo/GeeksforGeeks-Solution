/**
 * @param {number[]} r
 * @param {number[]} h
 * @return {number}
 */
class Solution {
    maxStackHeight(r, h) {
        let n = r.length;
        let discs = [];
        for(let i = 0; i < n; i++) discs.push([r[i], h[i]]);
        discs.sort((a, b) => {
            if(a[0] !== b[0]) return a[0] - b[0];
            return b[1] - a[1];
        });
        let MAXH = 1001;
        let bit = new Array(MAXH + 2).fill(0);
        let ans = 0;
        for(let d of discs) {
            let ht = d[1];
            let best = this.query(bit, ht - 1);
            let cur = best + ht;
            ans = Math.max(ans, cur);
            this.update(bit, ht, cur, MAXH);
        }
        return ans;
    }
    update(bit, idx, val, MAXH) {
        for(; idx <= MAXH; idx += idx & -idx) bit[idx] = Math.max(bit[idx], val);
    }
    query(bit, idx) {
        let res = 0;
        for(; idx > 0; idx -= idx & -idx) res = Math.max(res, bit[idx]);
        return res;
    }
}