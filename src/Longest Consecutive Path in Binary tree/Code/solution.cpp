/* Structure of Binary Tree Node
class Node {
  public:
    int data;
    Node* left;
    Node* right;

    Node(int val) {
        data = val;
        left = nullptr;
        right = nullptr;
    }
};
*/
class Solution {
  public:
    int ans = 1;

    // DFS to calculate consecutive path length
    void dfs(Node* node, int parentValue, int length) {
        // Stop if the node does not exist
        if (node == nullptr) return;

        // Check whether the current node continues the sequence
        if (node->data == parentValue + 1)
            length++;
        else
            // Start a new sequence from the current node
            length = 1;

        // Store the maximum sequence length found so far
        ans = max(ans, length);

        // Visit the left subtree
        dfs(node->left, node->data, length);

        // Visit the right subtree
        dfs(node->right, node->data, length);
    }

    int longestConsecutive(Node* root) {
        // Empty tree has no valid path
        if (root == nullptr) return -1;

        // Start DFS from the root
        // parentValue is set to root->data - 1
        // so that the root starts with length = 1
        dfs(root, root->data - 1, 0);

        // If no parent-child consecutive pair exists
        return (ans == 1) ? -1 : ans;
    }
};