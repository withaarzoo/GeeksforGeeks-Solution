/**
 * @param {number[]} edge
 * @return {number}
 */
class Solution {
    largestSumCycle(edge) {
        let n = edge.length;
        let indeg = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            if (edge[i] !== -1) indeg[edge[i]]++;
        }
        let q = [];
        let vis = new Array(n).fill(false);
        for (let i = 0; i < n; i++) {
            if (indeg[i] === 0) {
                q.push(i);
                vis[i] = true;
            }
        }
        while (q.length > 0) {
            let u = q.shift();
            let v = edge[u];
            if (v !== -1) {
                indeg[v]--;
                if (indeg[v] === 0) {
                    q.push(v);
                    vis[v] = true;
                }
            }
        }
        let ans = -1;
        for (let i = 0; i < n; i++) {
            if (!vis[i]) {
                let sum = 0;
                let cur = i;
                while (!vis[cur]) {
                    vis[cur] = true;
                    sum += cur;
                    cur = edge[cur];
                }
                ans = Math.max(ans, sum);
            }
        }
        return ans;
    }
}