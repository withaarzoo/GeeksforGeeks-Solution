/*
class Node {
public:
    int data;
    Node* left;
    Node* right;

    Node(int x) {
        data = x;
        left = right = NULL;
    }
};
*/

#include <vector>
#include <queue>
#include <unordered_map>
#include <limits>
using namespace std;

class Solution {
  public:
    vector<int> bottomView(Node *root) {
        vector<int> result;
        if (!root) return result;

        unordered_map<int,int> hdValue; // hd -> last seen node data
        queue<pair<Node*, int>> q;      // pair of node and its horizontal distance
        int minHd = 0, maxHd = 0;

        q.push({root, 0});

        while (!q.empty()) {
            auto p = q.front(); q.pop();
            Node* node = p.first;
            int hd = p.second;

            // Overwrite the value at this horizontal distance.
            // Because BFS is level-order, the later visit (deeper / later in same level)
            // will replace earlier ones — exactly what bottom view requires.
            hdValue[hd] = node->data;

            if (node->left) {
                q.push({node->left, hd - 1});
                if (hd - 1 < minHd) minHd = hd - 1;
            }
            if (node->right) {
                q.push({node->right, hd + 1});
                if (hd + 1 > maxHd) maxHd = hd + 1;
            }
        }

        // Collect results from leftmost hd to rightmost hd.
        for (int hd = minHd; hd <= maxHd; ++hd) {
            // hdValue must contain hd (because visited), so safe to access.
            result.push_back(hdValue[hd]);
        }

        return result;
    }
};
