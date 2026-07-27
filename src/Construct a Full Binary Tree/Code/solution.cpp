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

class Solution {
    unordered_map<int, int> prePos, mirrorPos;

    // Recursively builds the tree using current ranges
    Node* build(vector<int>& pre, vector<int>& mirror,
                int ps, int pe, int ms, int me) {

        // No nodes left
        if (ps > pe) return nullptr;

        // Create current root
        Node* root = new Node(pre[ps]);

        // Leaf node
        if (ps == pe) return root;

        // Next preorder element is left child
        int leftRoot = pre[ps + 1];

        // Next mirror preorder element is right child
        int rightRoot = mirror[ms + 1];

        // Position of right child in preorder
        int rightPos = prePos[rightRoot];

        // Number of nodes in left subtree
        int leftSize = rightPos - (ps + 1);

        // Build left subtree
        root->left = build(pre, mirror,
                           ps + 1, ps + leftSize,
                           mirrorPos[leftRoot], me);

        // Build right subtree
        root->right = build(pre, mirror,
                            ps + leftSize + 1, pe,
                            ms + 1, mirrorPos[rightRoot]);

        return root;
    }

public:
    Node *constructBinaryTree(vector<int> &pre, vector<int> &preMirror) {

        int n = pre.size();

        // Store index of every value in preorder
        for (int i = 0; i < n; i++)
            prePos[pre[i]] = i;

        // Store index of every value in mirror preorder
        for (int i = 0; i < n; i++)
            mirrorPos[preMirror[i]] = i;

        // Build the complete tree
        return build(pre, preMirror, 0, n - 1, 0, n - 1);
    }
};