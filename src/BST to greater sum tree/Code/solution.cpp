/*
class Node {
  public:
    int data;
    Node* left;
    Node* right;

    Node(int value) {
        data = value;
        left = nullptr;
        right = nullptr;
    }
};
*/

class Solution {
  private:
    // using long long to be safe for sums when many nodes are present
    long long acc = 0;

    // helper does reverse in-order traversal
    void dfs(Node* node) {
        if (!node) return;
        // visit right subtree first (greater values)
        dfs(node->right);

        // node->data should become sum of nodes greater than it,
        // which is exactly acc at this moment
        int val = node->data;    // store original value
        node->data = (int)acc;   // replace with sum of greater nodes

        // include original value into accumulator for smaller nodes
        acc += val;

        // visit left subtree (smaller values)
        dfs(node->left);
    }

  public:
    void transformTree(Node *root) {
        acc = 0;
        dfs(root);
    }
};
