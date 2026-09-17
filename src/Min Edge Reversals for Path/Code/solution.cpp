class Solution {
  public:
    int minimumEdgeReversal(vector<vector<int>> &edges, int n, int src, int dst) {
        // adjacency list: each entry is {neighbor, cost}
        vector<vector<pair<int,int>>> adj(n+1);
        
        // for every original edge u->v add both directions
        for(auto &e : edges){
            int u = e[0], v = e[1];
            adj[u].push_back({v, 0}); // keep original, cost 0
            adj[v].push_back({u, 1}); // reverse it, cost 1
        }
        
        // distance array, INF means unreachable
        const int INF = 1e9;
        vector<int> dist(n+1, INF);
        dist[src] = 0;
        
        // 0-1 BFS deque
        deque<int> dq;
        dq.push_back(src);
        
        while(!dq.empty()){
            int u = dq.front();
            dq.pop_front();
            
            for(auto [v, cost] : adj[u]){
                if(dist[u] + cost < dist[v]){
                    dist[v] = dist[u] + cost;
                    // cost 0 → push front, cost 1 → push back
                    if(cost == 0)
                        dq.push_front(v);
                    else
                        dq.push_back(v);
                }
            }
        }
        
        // if dst still INF we cannot reach it
        return dist[dst] == INF ? -1 : dist[dst];
    }
};