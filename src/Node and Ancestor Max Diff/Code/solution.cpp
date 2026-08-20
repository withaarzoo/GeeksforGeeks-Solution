/* Structure of Binary Tree Node
class Node {
  public:
    int data;
    Node *left;
    Node *right;
    Node(int val) {
        data = val;
        left = right = nullptr;
    }
};*/

class Solution
{
public:
    // This stores the maximum ancestor - descendant difference found so far.
    int ans;

    // This function returns the minimum value present in the current subtree.
    int dfs(Node *node)
    {
        // A null node does not contribute any value to the minimum.
        if (node == nullptr)
        {
            return INT_MAX;
        }

        // Recursively find the minimum values in both subtrees.
        int leftMin = dfs(node->left);
        int rightMin = dfs(node->right);

        // If the left subtree exists, compare the current ancestor with
        // the minimum descendant value available in that subtree.
        if (node->left != nullptr)
        {
            ans = max(ans, node->data - leftMin);
        }

        // If the right subtree exists, compare the current ancestor with
        // the minimum descendant value available in that subtree.
        if (node->right != nullptr)
        {
            ans = max(ans, node->data - rightMin);
        }

        // Return the minimum value in the entire current subtree so that
        // the parent can use it as one of its possible descendants.
        return min(node->data, min(leftMin, rightMin));
    }

    int maxDiff(Node *root)
    {
        // Start with the smallest possible integer because the answer
        // can also be negative.
        ans = INT_MIN;

        // Traverse the whole tree and calculate the answer.
        dfs(root);

        // Return the maximum ancestor - descendant difference.
        return ans;
    }
};