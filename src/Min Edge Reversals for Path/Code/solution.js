/*
 @param {number[][]}
 @param {number}
 @param {number}
 @param {number}
 @return {number}
*/

class Solution {
    minimumEdgeReversal(edges, n, src, dst) {
        // adjacency list: each entry is [neighbor, cost]
        let adj = Array.from({length: n+1}, () => []);
        
        // for every original edge u->v add both directions
        for(let e of edges){
            let u = e[0], v = e[1];
            adj[u].push([v, 0]); // keep original, cost 0
            adj[v].push([u, 1]); // reverse it, cost 1
        }
        
        // distance array, INF means unreachable
        let INF = 1e9;
        let dist = new Array(n+1).fill(INF);
        dist[src] = 0;
        
        // 0-1 BFS deque
        let dq = [];
        dq.push(src);
        
        while(dq.length > 0){
            let u = dq.shift();
            
            for(let [v, cost] of adj[u]){
                if(dist[u] + cost < dist[v]){
                    dist[v] = dist[u] + cost;
                    // cost 0 → push front, cost 1 → push back
                    if(cost === 0)
                        dq.unshift(v);
                    else
                        dq.push(v);
                }
            }
        }
        
        // if dst still INF we cannot reach it
        return dist[dst] === INF ? -1 : dist[dst];
    }
}