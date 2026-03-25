class Solution {
    public ArrayList<Integer> minHeightRoot(int V, int[][] edges) {

        ArrayList<Integer> result = new ArrayList<>();

        if (V == 1) {
            result.add(0);
            return result;
        }

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++)
            adj.add(new ArrayList<>());

        int[] degree = new int[V];

        // Build graph
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
            degree[e[0]]++;
            degree[e[1]]++;
        }

        Queue<Integer> q = new LinkedList<>();

        // Initial leaves
        for (int i = 0; i < V; i++) {
            if (degree[i] == 1)
                q.offer(i);
        }

        int remainingNodes = V;

        while (remainingNodes > 2) {
            int size = q.size();
            remainingNodes -= size;

            while (size-- > 0) {
                int leaf = q.poll();

                for (int neighbor : adj.get(leaf)) {
                    degree[neighbor]--;

                    if (degree[neighbor] == 1) {
                        q.offer(neighbor);
                    }
                }
            }
        }

        result.addAll(q);
        return result;
    }
}