import java.util.*;

/*
Layering idea:
node i in layer0 -> id = i
node i in layer1 -> id = i + V
edges[][] format: each row {u, v, w1, w2}
*/
class Solution {
    public int shortestPath(int V, int a, int b, int[][] edges) {
        final long INF = Long.MAX_VALUE / 4;
        int N = 2 * V;
        ArrayList<ArrayList<long[]>> adj = new ArrayList<>(N);
        for (int i = 0; i < N; ++i)
            adj.add(new ArrayList<>());

        for (int[] e : edges) {
            int u = e[0], v = e[1];
            long w1 = e[2], w2 = e[3];

            // straight edges
            adj.get(u).add(new long[] { v, w1 });
            adj.get(v).add(new long[] { u, w1 });
            adj.get(u + V).add(new long[] { v + V, w1 });
            adj.get(v + V).add(new long[] { u + V, w1 });

            // curved edges: from layer0 to layer1
            adj.get(u).add(new long[] { v + V, w2 });
            adj.get(v).add(new long[] { u + V, w2 });
        }

        long[] dist = new long[N];
        Arrays.fill(dist, INF);
        PriorityQueue<long[]> pq = new PriorityQueue<>(Comparator.comparingLong(o -> o[0]));
        dist[a] = 0;
        pq.add(new long[] { 0, a });

        while (!pq.isEmpty()) {
            long[] top = pq.poll();
            long d = top[0];
            int node = (int) top[1];
            if (d != dist[node])
                continue;

            for (long[] edge : adj.get(node)) {
                int nxt = (int) edge[0];
                long w = edge[1];
                if (dist[nxt] > d + w) {
                    dist[nxt] = d + w;
                    pq.add(new long[] { dist[nxt], nxt });
                }
            }
        }

        long ans = Math.min(dist[b], dist[b + V]);
        if (ans >= INF)
            return -1;
        return (int) ans;
    }
}
