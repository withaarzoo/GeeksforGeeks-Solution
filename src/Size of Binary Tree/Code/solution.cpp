/*
Definition for Node
struct Node {
    int data;
    struct Node* left;
    struct Node* right;

    Node(int val) {
        data = val;
        left = right = NULL;
    }
};
*/
class Solution
{
public:
    int getSize(Node *root)
    {

        // If node is NULL, there are no nodes to count
        if (root == NULL)
        {
            return 0;
        }

        // Recursively count nodes in left subtree
        int leftSize = getSize(root->left);

        // Recursively count nodes in right subtree
        int rightSize = getSize(root->right);

        // Total size =
        // left subtree nodes + right subtree nodes + current node
        return leftSize + rightSize + 1;
    }
};