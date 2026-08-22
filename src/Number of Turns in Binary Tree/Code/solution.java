import java.util.*;

class Solution {

    // This DFS finds a target and stores the L/R path from root to that target.
    private boolean findPath(Node root, int target, List<Character> path) {
        // If this subtree is empty, the target cannot be found here.
        if (root == null)
            return false;

        // If I reached the target, the current path is complete.
        if (root.data == target)
            return true;

        // Record a left move before searching the left subtree.
        path.add('L');

        // Keep the move only if the target exists in the left subtree.
        if (findPath(root.left, target, path))
            return true;

        // Remove the failed left move before trying the right subtree.
        path.remove(path.size() - 1);

        // Record a right move before searching the right subtree.
        path.add('R');

        // Keep the move only if the target exists in the right subtree.
        if (findPath(root.right, target, path))
            return true;

        // Remove the failed right move because this subtree also did not contain the
        // target.
        path.remove(path.size() - 1);

        // Tell the parent call that the target was not found here.
        return false;
    }

    public int numberOfTurns(Node root, int p, int q) {
        // Store the directions from root to p and root to q.
        List<Character> pathP = new ArrayList<>();
        List<Character> pathQ = new ArrayList<>();

        // Build both root-to-node paths.
        findPath(root, p, pathP);
        findPath(root, q, pathQ);

        // Find the common prefix, which ends at the Lowest Common Ancestor.
        int i = 0;
        while (i < pathP.size() && i < pathQ.size()
                && pathP.get(i) == pathQ.get(i)) {
            i++;
        }

        // Store the exact direction sequence while travelling from p to q.
        List<Character> path = new ArrayList<>();

        // Move from p upward to the LCA, so add p's remaining path in reverse.
        for (int j = pathP.size() - 1; j >= i; j--) {
            path.add(pathP.get(j));
        }

        // Move from the LCA downward to q using q's remaining path normally.
        for (int j = i; j < pathQ.size(); j++) {
            path.add(pathQ.get(j));
        }

        // Fewer than two edges means no turn is possible.
        if (path.size() < 2)
            return -1;

        // Count every place where the movement changes from L to R or R to L.
        int turns = 0;
        for (int j = 1; j < path.size(); j++) {
            if (path.get(j) != path.get(j - 1)) {
                turns++;
            }
        }

        // If there was no direction change, the path is straight.
        return turns == 0 ? -1 : turns;
    }
}