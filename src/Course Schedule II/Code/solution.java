import java.util.*;

/*
 * Java solution using Kahn's algorithm (BFS topological sort).
 */
class Solution {
    public ArrayList<Integer> findOrder(int n, int[][] prerequisites) {
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>(n);
        for (int i = 0; i < n; ++i)
            adj.add(new ArrayList<>());

        int[] indeg = new int[n];
        for (int[] pr : prerequisites) {
            int x = pr[0], y = pr[1]; // y -> x
            adj.get(y).add(x);
            indeg[x]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; ++i)
            if (indeg[i] == 0)
                q.offer(i);

        ArrayList<Integer> order = new ArrayList<>(n);
        while (!q.isEmpty()) {
            int node = q.poll();
            order.add(node);
            for (int nei : adj.get(node)) {
                indeg[nei]--;
                if (indeg[nei] == 0)
                    q.offer(nei);
            }
        }

        if (order.size() == n)
            return order;
        return new ArrayList<>(); // cycle detected
    }
}
