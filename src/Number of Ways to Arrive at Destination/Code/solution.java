import java.util.*;

/*
Count number of shortest paths from node 0 to node V-1 in a weighted undirected graph.
Signature matches: public int countPaths(int V, int[][] edges)
edges: each row [u, v, w]
*/
class Solution {
    static final int MOD = 1_000_000_007;

    static class Edge {
        int to;
        int w;

        Edge(int to, int w) {
            this.to = to;
            this.w = w;
        }
    }

    static class State implements Comparable<State> {
        long dist;
        int node;

        State(long d, int n) {
            dist = d;
            node = n;
        }

        public int compareTo(State o) {
            return Long.compare(this.dist, o.dist);
        }
    }

    public int countPaths(int V, int[][] edges) {
        long INF = Long.MAX_VALUE / 4;
        List<List<Edge>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++)
            adj.add(new ArrayList<>());
        for (int[] e : edges) {
            int u = e[0], v = e[1], w = e[2];
            adj.get(u).add(new Edge(v, w));
            adj.get(v).add(new Edge(u, w));
        }
        long[] dist = new long[V];
        Arrays.fill(dist, INF);
        int[] ways = new int[V];
        PriorityQueue<State> pq = new PriorityQueue<>();
        dist[0] = 0;
        ways[0] = 1;
        pq.add(new State(0, 0));
        while (!pq.isEmpty()) {
            State cur = pq.poll();
            long d = cur.dist;
            int node = cur.node;
            if (d > dist[node])
                continue;
            for (Edge e : adj.get(node)) {
                int nei = e.to;
                long nd = d + e.w;
                if (nd < dist[nei]) {
                    dist[nei] = nd;
                    ways[nei] = ways[node];
                    pq.add(new State(nd, nei));
                } else if (nd == dist[nei]) {
                    ways[nei] = (int) ((ways[nei] + (long) ways[node]) % MOD);
                }
            }
        }
        return ways[V - 1] % MOD;
    }
}
