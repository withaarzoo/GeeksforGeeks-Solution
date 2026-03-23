import java.util.*;

class Solution {
    public int longestCycle(int V, int[][] edges) {
        int[] adj = new int[V];
        Arrays.fill(adj, -1);

        for (int[] e : edges) {
            adj[e[0]] = e[1];
        }

        boolean[] visited = new boolean[V];
        int maxCycle = -1;

        for (int i = 0; i < V; i++) {
            if (visited[i])
                continue;

            HashMap<Integer, Integer> map = new HashMap<>();
            int node = i, step = 0;

            while (node != -1) {
                if (map.containsKey(node)) {
                    int cycleLen = step - map.get(node);
                    maxCycle = Math.max(maxCycle, cycleLen);
                    break;
                }

                if (visited[node])
                    break;

                map.put(node, step++);
                visited[node] = true;
                node = adj[node];
            }
        }

        return maxCycle;
    }
}