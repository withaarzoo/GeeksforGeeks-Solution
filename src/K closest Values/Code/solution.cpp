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

#include <vector>
#include <stack>
#include <cmath>
using namespace std;

class Solution {
  private:
    // push path for predecessors: nodes with val <= target (go right to find larger <= target)
    void initPred(Node* root, int target, stack<Node*>& st) {
        while (root) {
            if (root->data <= target) {
                st.push(root);
                root = root->right;
            } else {
                root = root->left;
            }
        }
    }
    // push path for successors: nodes with val > target (go left to find smaller > target)
    void initSucc(Node* root, int target, stack<Node*>& st) {
        while (root) {
            if (root->data > target) {
                st.push(root);
                root = root->left;
            } else {
                root = root->right;
            }
        }
    }
    // get next predecessor (largest value < = previous)
    int getNextPred(stack<Node*>& st) {
        Node* node = st.top(); st.pop();
        int val = node->data;
        node = node->left; // after visiting node, predecessor continues on left subtree's rightmost
        while (node) {
            st.push(node);
            node = node->right;
        }
        return val;
    }
    // get next successor (smallest value > previous)
    int getNextSucc(stack<Node*>& st) {
        Node* node = st.top(); st.pop();
        int val = node->data;
        node = node->right; // after visiting node, successor continues on right subtree's leftmost
        while (node) {
            st.push(node);
            node = node->left;
        }
        return val;
    }

  public:
    vector<int> getKClosest(Node* root, int target, int k) {
        vector<int> res;
        if (!root || k <= 0) return res;

        stack<Node*> pred, succ;
        initPred(root, target, pred);
        initSucc(root, target, succ);

        while (k-- > 0) {
            if (pred.empty() && succ.empty()) break;
            else if (pred.empty()) res.push_back(getNextSucc(succ));
            else if (succ.empty()) res.push_back(getNextPred(pred));
            else {
                int pval = pred.top()->data;
                int sval = succ.top()->data;
                int pdiff = abs(pval - target);
                int sdiff = abs(sval - target);
                // tie: choose smaller value => pick predecessor
                if (pdiff <= sdiff) res.push_back(getNextPred(pred));
                else res.push_back(getNextSucc(succ));
            }
        }
        return res;
    }
};
