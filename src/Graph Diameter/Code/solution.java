import java.util.*;

class Solution {
    // BFS that starts from start; returns farthest node and also list of component
    // nodes
    private Pair<Integer, List<Integer>> bfsCollect(int start, List<List<Integer>> adj) {
        int n = adj.size();
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new LinkedList<>();
        List<Integer> comp = new ArrayList<>();
        q.add(start);
        dist[start] = 0;
        int farthest = start;
        while (!q.isEmpty()) {
            int u = q.poll();
            comp.add(u);
            if (dist[u] > dist[farthest])
                farthest = u;
            for (int v : adj.get(u)) {
                if (dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    q.add(v);
                }
            }
        }
        return new Pair<>(farthest, comp);
    }

    // BFS from src to compute maximum distance reachable from src
    private int bfsMaxDist(int src, List<List<Integer>> adj) {
        int n = adj.size();
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new LinkedList<>();
        q.add(src);
        dist[src] = 0;
        int maxd = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            maxd = Math.max(maxd, dist[u]);
            for (int v : adj.get(u)) {
                if (dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    q.add(v);
                }
            }
        }
        return maxd;
    }

    public int diameter(int V, int[][] edges) {
        if (V <= 1)
            return 0;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; ++i)
            adj.add(new ArrayList<>());
        for (int[] e : edges) {
            int a = e[0], b = e[1];
            adj.get(a).add(b);
            adj.get(b).add(a);
        }

        boolean[] processed = new boolean[V];
        int answer = 0;
        for (int i = 0; i < V; ++i) {
            if (processed[i])
                continue;
            Pair<Integer, List<Integer>> res = bfsCollect(i, adj);
            int u = res.getKey();
            List<Integer> compNodes = res.getValue();
            for (int node : compNodes)
                processed[node] = true;
            int compDiam = bfsMaxDist(u, adj);
            answer = Math.max(answer, compDiam);
        }
        return answer;
    }

    // Simple Pair implementation if not using javafx/util
    static class Pair<K, V> {
        private K key;
        private V val;

        Pair(K k, V v) {
            key = k;
            val = v;
        }

        K getKey() {
            return key;
        }

        V getValue() {
            return val;
        }
    }
}
