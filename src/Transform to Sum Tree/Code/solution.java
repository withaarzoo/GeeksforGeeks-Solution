/* Structure for Tree Node
class Node {
    int data;
    Node left, right;

    // Constructor
    Node(int val) {
        data = val;
        left = null;
        right = null;
    }
};
*/
class Solution {

    // Helper function to transform tree
    // and return original subtree sum
    int solve(Node root) {

        // Base case
        if (root == null)
            return 0;

        // Calculate left subtree sum
        int leftSum = solve(root.left);

        // Calculate right subtree sum
        int rightSum = solve(root.right);

        // Store original node value
        int originalValue = root.data;

        // Update current node value
        root.data = leftSum + rightSum;

        // Return total subtree sum
        return originalValue + root.data;
    }

    public void toSumTree(Node root) {

        // Start recursion
        solve(root);
    }
}