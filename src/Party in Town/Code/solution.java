class Solution {
    public int partyHouse(ArrayList<ArrayList<Integer>> adj) {
        int n = adj.size();
        if (n == 1) return 0;
        
        // first BFS: find one end of the diameter
        int[] first = bfs(adj, 0, n);
        // second BFS: find the other end and the length of the diameter
        int[] second = bfs(adj, first[0], n);
        int diameter = second[1];
        return (diameter + 1) / 2;
    }
    
    // helper that returns int[]{farthest node index, distance to it}
    private int[] bfs(ArrayList<ArrayList<Integer>> adj, int start, int n) {
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new LinkedList<>();
        q.add(start);
        dist[start] = 0;
        int far = start;
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : adj.get(u)) {
                int idx = v - 1;              // convert 1-based house number to 0-based index
                if (dist[idx] == -1) {
                    dist[idx] = dist[u] + 1;
                    q.add(idx);
                    if (dist[idx] > dist[far]) far = idx;
                }
            }
        }
        return new int[]{far, dist[far]};
    }
}