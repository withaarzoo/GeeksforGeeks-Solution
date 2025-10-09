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

class Solution {
  public:
    vector<int> postOrder(Node* root) {
        vector<int> result;
        if (!root) return result;

        std::stack<Node*> st;
        Node* curr = root;
        Node* lastVisited = nullptr; // keeps track of last node we output

        while (curr != nullptr || !st.empty()) {
            // go to the leftmost node
            if (curr != nullptr) {
                st.push(curr);
                curr = curr->left;
            } else {
                Node* peekNode = st.top();
                // if right child exists and hasn't been visited yet, traverse it
                if (peekNode->right != nullptr && lastVisited != peekNode->right) {
                    curr = peekNode->right;
                } else {
                    // right child is already processed or doesn't exist -> visit node
                    result.push_back(peekNode->data);
                    lastVisited = peekNode;
                    st.pop();
                }
            }
        }
        return result;
    }
};
