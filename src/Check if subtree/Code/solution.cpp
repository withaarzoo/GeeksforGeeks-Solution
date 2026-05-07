/*
Definition for Node
struct Node
{
    int data;
    Node* left;
    Node* right;

    Node(int x){
        data = x;
        left = right = nullptr;
    }
};
*/

class Solution
{
public:
    // Function to check whether two trees are identical
    bool isSame(Node *a, Node *b)
    {

        // If both nodes are NULL, trees match till here
        if (a == NULL && b == NULL)
            return true;

        // If one node is NULL and the other is not
        // then structure is different
        if (a == NULL || b == NULL)
            return false;

        // If current node values are different
        // then trees are not identical
        if (a->data != b->data)
            return false;

        // Recursively check left and right subtrees
        return isSame(a->left, b->left) &&
               isSame(a->right, b->right);
    }

    bool isSubTree(Node *root1, Node *root2)
    {

        // Empty tree is always a subtree
        if (root2 == NULL)
            return true;

        // If main tree becomes empty
        // subtree cannot exist anymore
        if (root1 == NULL)
            return false;

        // If both trees match completely from this node
        if (isSame(root1, root2))
            return true;

        // Otherwise search in left and right subtree
        return isSubTree(root1->left, root2) ||
               isSubTree(root1->right, root2);
    }
};