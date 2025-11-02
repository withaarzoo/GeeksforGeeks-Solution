class Solution:
    def maxEdgesToAdd(self, V, edges):
        # total forward pairs in a topological order = V*(V-1)//2
        total_pairs = V * (V - 1) // 2
        existing = len(edges)  # number of existing edges
        return total_pairs - existing
