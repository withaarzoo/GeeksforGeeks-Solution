/*
class Node {
  public:
    int data;
    Node* left;
    Node* right;
    Node(int val) {
        data = val;
        left = right = nullptr;
    }
};
*/

class Solution {
  private:
    // Morris inorder count
    int countNodes(Node* root) {
        int count = 0;
        Node* curr = root;
        while (curr) {
            if (!curr->left) {
                ++count;               // visit
                curr = curr->right;
            } else {
                Node* pred = curr->left;
                while (pred->right && pred->right != curr)
                    pred = pred->right;
                if (!pred->right) {
                    pred->right = curr; // make thread
                    curr = curr->left;
                } else {
                    pred->right = nullptr; // remove thread
                    ++count;               // visit
                    curr = curr->right;
                }
            }
        }
        return count;
    }

    // Morris inorder to get k-th visited node value
    int getKth(Node* root, int k) {
        int cnt = 0;
        Node* curr = root;
        while (curr) {
            if (!curr->left) {
                ++cnt;
                if (cnt == k) return curr->data;
                curr = curr->right;
            } else {
                Node* pred = curr->left;
                while (pred->right && pred->right != curr)
                    pred = pred->right;
                if (!pred->right) {
                    pred->right = curr;
                    curr = curr->left;
                } else {
                    pred->right = nullptr;
                    ++cnt;
                    if (cnt == k) return curr->data;
                    curr = curr->right;
                }
            }
        }
        return 0; // fallback
    }

  public:
    int findMedian(Node* root) {
        if (!root) return 0;
        int n = countNodes(root);
        int k = (n % 2 == 1) ? (n + 1) / 2 : (n / 2);
        return getKth(root, k);
    }
};
