/* Binary Tree Node Structure
class Node {
public:
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = right = nullptr;
    }
}; 
*/

class Solution {
  public:
    // prev stores the value of the previously visited node
    // minDiff keeps the smallest absolute difference found so far
    long long prev = -1;          // -1 means "no previous node yet"
    long long minDiff = 1e18;     // start with a huge number

    void inorder(Node* root) {
        if (!root) return;                    // base case: empty subtree

        inorder(root->left);                  // 1. finish left subtree first

        // 2. process current node
        if (prev != -1) {                     // only compute if we already saw a node
            long long diff = root->data - prev;
            if (diff < minDiff) minDiff = diff;
        }
        prev = root->data;                    // remember this node for the next one

        inorder(root->right);                 // 3. now go to right subtree
    }

    int absDiff(Node *root) {
        prev = -1;                            // reset for safety
        minDiff = 1e18;
        inorder(root);
        return (int)minDiff;
    }
};