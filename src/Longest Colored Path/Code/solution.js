/**
 * @param {string} s
 * @param {number[][]} edges
 * @returns {number}
 */

class Solution {
    longestPath(s, edges) {
        const n = s.length;
        const adj = Array.from({length: n + 1}, () => []);
        for (const e of edges) {
            adj[e[0]].push(e[1]);
            adj[e[1]].push(e[0]);
        }
        const redMax = new Array(n + 1).fill(0);
        const blueMax = new Array(n + 1).fill(0);
        const vis = new Array(n + 1).fill(false);
        const process = (col, mx) => {
            vis.fill(false);
            for (let i = 1; i <= n; i++) {
                if (vis[i] || s[i - 1] !== col) continue;
                const comp = [];
                const st = [i];
                vis[i] = true;
                while (st.length) {
                    const u = st.pop();
                    comp.push(u);
                    for (const v of adj[u]) {
                        if (!vis[v] && s[v - 1] === col) {
                            vis[v] = true;
                            st.push(v);
                        }
                    }
                }
                const sz = comp.length;
                const id = new Map();
                for (let j = 0; j < sz; j++) id.set(comp[j], j);
                const ladj = Array.from({length: sz}, () => []);
                for (const u of comp) {
                    for (const v of adj[u]) {
                        if (s[v - 1] === col && id.has(v))
                            ladj[id.get(u)].push(id.get(v));
                    }
                }
                const bfs = (start) => {
                    const dist = new Array(sz).fill(-1);
                    const q = [start];
                    dist[start] = 0;
                    let far = start;
                    let head = 0;
                    while (head < q.length) {
                        const u = q[head++];
                        if (dist[u] > dist[far]) far = u;
                        for (const v of ladj[u]) {
                            if (dist[v] === -1) {
                                dist[v] = dist[u] + 1;
                                q.push(v);
                            }
                        }
                    }
                    return [far, dist];
                };
                const [far1, d1] = bfs(0);
                const [far2, d2] = bfs(far1);
                const [far3, d3] = bfs(far2);
                for (let j = 0; j < sz; j++)
                    mx[comp[j]] = Math.max(d2[j], d3[j]);
            }
        };
        process('R', redMax);
        process('B', blueMax);
        let ans = 1;
        for (let i = 1; i <= n; i++) {
            if (s[i - 1] === 'R') ans = Math.max(ans, redMax[i] + 1);
            else ans = Math.max(ans, blueMax[i] + 1);
        }
        for (const e of edges) {
            const u = e[0], v = e[1];
            if (s[u - 1] !== s[v - 1]) {
                if (s[u - 1] === 'R')
                    ans = Math.max(ans, redMax[u] + 1 + blueMax[v] + 1);
                else
                    ans = Math.max(ans, blueMax[u] + 1 + redMax[v] + 1);
            }
        }
        return ans;
    }
}