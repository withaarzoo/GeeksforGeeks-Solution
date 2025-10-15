/*
class Node {
  public:
    int data;
    Node* left;
    Node* right;

    Node(int val) {
        data = val;
        left = right = NULL;
    }
};
*/

class Solution {
  public:
    int kthSmallest(Node *root, int k) {
        // Iterative inorder using stack to get k-th smallest
        std::stack<Node*> st;
        Node* curr = root;

        while (curr != nullptr || !st.empty()) {
            // go as left as possible
            while (curr != nullptr) {
                st.push(curr);
                curr = curr->left;
            }

            // process top
            curr = st.top(); st.pop();
            k--;
            if (k == 0) return curr->data; // found k-th smallest

            // move to right subtree
            curr = curr->right;
        }

        // if k is larger than number of nodes
        return -1;
    }
};
