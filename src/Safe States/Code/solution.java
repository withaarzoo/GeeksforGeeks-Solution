import java.util.*;

class Solution {
    public ArrayList<Integer> safeNodes(int V, int[][] edges) {
        ArrayList<ArrayList<Integer>> revGraph = new ArrayList<>(V);
        for (int i = 0; i < V; ++i)
            revGraph.add(new ArrayList<>());
        int[] outdeg = new int[V];

        // Build reverse graph and out-degree counts
        for (int[] e : edges) {
            int u = e[0], v = e[1];
            if (u < 0 || u >= V || v < 0 || v >= V)
                continue;
            revGraph.get(v).add(u);
            outdeg[u]++;
        }

        ArrayDeque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < V; ++i)
            if (outdeg[i] == 0)
                q.add(i);

        ArrayList<Integer> safe = new ArrayList<>();
        while (!q.isEmpty()) {
            int node = q.poll();
            safe.add(node);
            for (int parent : revGraph.get(node)) {
                outdeg[parent]--;
                if (outdeg[parent] == 0)
                    q.add(parent);
            }
        }
        Collections.sort(safe);
        return safe;
    }
}
