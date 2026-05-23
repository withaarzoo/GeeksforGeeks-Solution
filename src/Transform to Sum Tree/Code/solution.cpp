/* Structure for Tree Node
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

class Solution
{
public:
    // Helper function to convert tree and return
    // total sum of original subtree
    int solve(Node *root)
    {

        // Base case
        if (root == NULL)
            return 0;

        // Recursively get left subtree sum
        int leftSum = solve(root->left);

        // Recursively get right subtree sum
        int rightSum = solve(root->right);

        // Store original node value before changing it
        int originalValue = root->data;

        // Update current node with sum of left and right subtree
        root->data = leftSum + rightSum;

        // Return total original subtree sum to parent
        return originalValue + root->data;
    }

    void toSumTree(Node *root)
    {

        // Start recursive transformation
        solve(root);
    }
};