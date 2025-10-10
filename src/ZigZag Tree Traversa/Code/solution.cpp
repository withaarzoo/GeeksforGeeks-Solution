/*
class Node {
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = right = NULL;
    }
};
*/
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<int> zigZagTraversal(Node* root) {
        vector<int> result;
        if (!root) return result;

        queue<Node*> q;
        q.push(root);
        bool leftToRight = true;

        while (!q.empty()) {
            int levelSize = q.size();
            deque<int> levelVals; // deque makes it easy to add at front or back

            for (int i = 0; i < levelSize; ++i) {
                Node* node = q.front();
                q.pop();

                // insert value in required order for this level
                if (leftToRight) levelVals.push_back(node->data);
                else levelVals.push_front(node->data);

                // push children for the next level
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }

            // append level values to result
            for (int v : levelVals) result.push_back(v);
            leftToRight = !leftToRight; // toggle direction
        }

        return result;
    }
};
