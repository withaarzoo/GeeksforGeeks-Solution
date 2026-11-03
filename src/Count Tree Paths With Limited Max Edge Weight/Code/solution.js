/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} queries
 * @return {number[]}
 */
class Solution {
    maximumWeight(n, edges, queries) {
        edges.sort((a, b) => a[2] - b[2]);
        const q = queries.length;
        const sortedQ = [];
        for (let i = 0; i < q; i++) sortedQ.push([queries[i], i]);
        sortedQ.sort((a, b) => a[0] - b[0]);
        const parent = new Array(n + 1);
        const sz = new Array(n + 1).fill(1);
        for (let i = 1; i <= n; i++) parent[i] = i;
        const find = (x) => {
            if (parent[x] !== x) parent[x] = find(parent[x]);
            return parent[x];
        };
        let paths = 0;
        const ans = new Array(q);
        let j = 0;
        for (const [x, idx] of sortedQ) {
            while (j < edges.length && edges[j][2] <= x) {
                const u = edges[j][0], v = edges[j][1];
                let pu = find(u), pv = find(v);
                if (pu !== pv) {
                    paths += sz[pu] * sz[pv];
                    if (sz[pu] < sz[pv]) [pu, pv] = [pv, pu];
                    parent[pv] = pu;
                    sz[pu] += sz[pv];
                }
                j++;
            }
            ans[idx] = paths;
        }
        return ans;
    }
}