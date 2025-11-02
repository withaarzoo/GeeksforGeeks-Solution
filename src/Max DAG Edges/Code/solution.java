class Solution {
    public int maxEdgesToAdd(int V, int[][] edges) {
        // Total forward pairs in any topological ordering:
        long totalPairs = 1L * V * (V - 1) / 2;
        long existing = edges.length; // number of current edges
        long result = totalPairs - existing;
        return (int) result;
    }
}
