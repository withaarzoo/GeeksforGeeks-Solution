/* Binary Tree Node Structure
class Node {
  public:
    int data;
    Node *left;
    Node *right;

    Node(int x) {
        data = x;
        left = nullptr;
        right = nullptr;
    }
};
*/

class Solution {
  public:
    // helper that walks the tree and records every leaf depth
    void collect(Node* node, int depth, vector<int>& leaves) {
        if (!node) return;                     // safety, never happens for a real root
        if (!node->left && !node->right) {     // both children null → this is a leaf
            leaves.push_back(depth);           // store its level
            return;
        }
        collect(node->left, depth + 1, leaves);  // go left, depth increases by 1
        collect(node->right, depth + 1, leaves); // go right, depth increases by 1
    }

    int getCount(Node *root, int k) {
        vector<int> leaves;                    // will hold all leaf levels
        collect(root, 1, leaves);              // root starts at level 1
        sort(leaves.begin(), leaves.end());    // cheapest first
        int count = 0;
        for (int cost : leaves) {
            if (cost > k) break;               // cannot afford this leaf or any later one
            k -= cost;                         // pay for it
            count++;                           // one more leaf visited
        }
        return count;
    }
};