/*
class Node {
public:
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = right = NULL;
    }
};
*/

#include <climits>
#include <algorithm>

class Solution {
private:
    // helper returns maximum downward path sum for a node (to be used by parent)
    int helper(Node* node, int &globalMax) {
        if (!node) return 0;

        // compute max contribution from left and right; ignore negatives
        int left = std::max(0, helper(node->left, globalMax));
        int right = std::max(0, helper(node->right, globalMax));

        // best path that uses node as highest point (could be global best)
        int current = node->data + left + right;
        globalMax = std::max(globalMax, current);

        // return the best single-sided path to connect with parent
        return node->data + std::max(left, right);
    }

public:
    int findMaxSum(Node *root) {
        if (!root) return 0; // if empty tree (problem constraints usually have >=1 node)
        int globalMax = INT_MIN;
        helper(root, globalMax);
        return globalMax;
    }
};
