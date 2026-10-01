/**
 * @param {number[]} duration
 * @param {number[][]} dependencies
 * @returns {number}
 */
class Solution {
    minTime(duration, dependencies) {
        const n = duration.length;
        const adj = Array.from({length: n}, () => []);
        const indeg = new Array(n).fill(0);
        for (const d of dependencies) {
            adj[d[0]].push(d[1]);
            indeg[d[1]]++;
        }
        const finish = duration.slice();
        const q = [];
        for (let i = 0; i < n; i++) {
            if (indeg[i] === 0) q.push(i);
        }
        let cnt = 0;
        while (q.length) {
            const u = q.shift();
            cnt++;
            for (const v of adj[u]) {
                finish[v] = Math.max(finish[v], finish[u] + duration[v]);
                if (--indeg[v] === 0) q.push(v);
            }
        }
        if (cnt < n) return -1;
        return Math.max(...finish);
    }
}