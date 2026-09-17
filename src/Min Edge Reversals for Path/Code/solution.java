class Solution {
    public int minimumEdgeReversal(int[][] edges, int n, int src, int dst) {
        // adjacency list: each entry is {neighbor, cost}
        List<List<int[]>> adj = new ArrayList<>();
        for(int i = 0; i <= n; i++)
            adj.add(new ArrayList<>());
        
        // for every original edge u->v add both directions
        for(int[] e : edges){
            int u = e[0], v = e[1];
            adj.get(u).add(new int[]{v, 0}); // keep original, cost 0
            adj.get(v).add(new int[]{u, 1}); // reverse it, cost 1
        }
        
        // distance array, INF means unreachable
        int INF = (int)1e9;
        int[] dist = new int[n+1];
        Arrays.fill(dist, INF);
        dist[src] = 0;
        
        // 0-1 BFS deque
        Deque<Integer> dq = new ArrayDeque<>();
        dq.addLast(src);
        
        while(!dq.isEmpty()){
            int u = dq.pollFirst();
            
            for(int[] edge : adj.get(u)){
                int v = edge[0], cost = edge[1];
                if(dist[u] + cost < dist[v]){
                    dist[v] = dist[u] + cost;
                    // cost 0 → push front, cost 1 → push back
                    if(cost == 0)
                        dq.addFirst(v);
                    else
                        dq.addLast(v);
                }
            }
        }
        
        // if dst still INF we cannot reach it
        return dist[dst] == INF ? -1 : dist[dst];
    }
}