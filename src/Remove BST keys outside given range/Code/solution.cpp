/*
class Node {
  public:
    int data;
    Node* left;
    Node* right;

    Node(int val) {
        data = val;
        left = NULL;
        right = NULL;
    }
};
*/

class Solution {
  public:
    Node* removekeys(Node* root, int l, int r) {
        if (root == nullptr) return nullptr;

        // If current node is smaller than range, discard left subtree
        if (root->data < l) {
            return removekeys(root->right, l, r);
        }

        // If current node is greater than range, discard right subtree
        if (root->data > r) {
            return removekeys(root->left, l, r);
        }

        // Node is in range: recursively fix left and right subtrees
        root->left = removekeys(root->left, l, r);
        root->right = removekeys(root->right, l, r);
        return root;
    }
};
