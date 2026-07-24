/* Structure of Binary Tree Node
class Node {
    int data;
    Node left;
    Node right;

    Node(int data) {
        this.data = data;
        left = null;
        right = null;
    }
}
}*/
class Solution {

    // Stores the maximum consecutive path length
    int ans = 1;

    // DFS traversal
    void dfs(Node node, int parentValue, int length) {

        // Stop if the node is null
        if (node == null) return;

        // Continue the sequence if values are consecutive
        if (node.data == parentValue + 1)
            length++;
        else
            // Otherwise start a new sequence
            length = 1;

        // Update the answer
        ans = Math.max(ans, length);

        // Traverse left subtree
        dfs(node.left, node.data, length);

        // Traverse right subtree
        dfs(node.right, node.data, length);
    }

    public int longestConsecutive(Node root) {

        // Empty tree
        if (root == null) return -1;

        // Start DFS
        dfs(root, root.data - 1, 0);

        // Return -1 if no valid consecutive path exists
        return ans == 1 ? -1 : ans;
    }
}