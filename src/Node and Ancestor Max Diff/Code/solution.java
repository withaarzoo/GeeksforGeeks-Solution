/* Structure of binary tree node
class Node
{
    int data;
    Node left, right;

    Node(int item)
    {
        data = item;
        left = right = null;
    }
}
*/

class Solution {
    // This stores the maximum ancestor - descendant difference found so far.
    private int ans;

    // This function returns the minimum value present in the current subtree.
    private int dfs(Node node) {
        // A null node should not affect the minimum calculation.
        if (node == null) {
            return Integer.MAX_VALUE;
        }

        // Recursively find the minimum values in both subtrees.
        int leftMin = dfs(node.left);
        int rightMin = dfs(node.right);

        // If the left subtree exists, use its minimum as a possible descendant.
        if (node.left != null) {
            ans = Math.max(ans, node.data - leftMin);
        }

        // If the right subtree exists, use its minimum as a possible descendant.
        if (node.right != null) {
            ans = Math.max(ans, node.data - rightMin);
        }

        // Return the minimum value in this subtree to the parent node.
        return Math.min(node.data, Math.min(leftMin, rightMin));
    }

    int maxDiff(Node root) {
        // The answer can be negative, so start from the smallest integer.
        ans = Integer.MIN_VALUE;

        // Process the complete tree.
        dfs(root);

        // Return the maximum difference found.
        return ans;
    }
}