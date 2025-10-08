/*
class Node {
public:
    int data;
    Node *left;
    Node *right;

    Node(int x) {
        data = x;
        left = NULL;
        right = NULL;
    }
};
*/

class Solution {
  public:
    Node *constructTree(vector<int> &pre, vector<int> &post) {
        int n = pre.size();
        if (n == 0) return NULL;
        unordered_map<int,int> pos;
        for (int i = 0; i < n; ++i) pos[post[i]] = i;

        // helper lambda: build tree from pre[preL..preR] and post[postL..postR]
        function<Node*(int,int,int,int)> build = [&](int preL, int preR, int postL, int postR) -> Node* {
            if (preL > preR || postL > postR) return NULL;
            Node* root = new Node(pre[preL]);                // root is first in preorder
            if (preL == preR) return root;                   // leaf node
            int leftRootVal = pre[preL + 1];                 // root of left subtree
            int idx = pos[leftRootVal];                      // find left root in postorder
            int leftSize = idx - postL + 1;                  // number of nodes in left subtree
            // build left and right using calculated sizes
            root->left  = build(preL + 1, preL + leftSize, postL, idx);
            root->right = build(preL + leftSize + 1, preR, idx + 1, postR - 1);
            return root;
        };

        return build(0, n - 1, 0, n - 1);
    }
}; 
