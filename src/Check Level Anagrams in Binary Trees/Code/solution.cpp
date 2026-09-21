/* Structure of binary tree Node
class Node {
    public:
    int data;
    Node *left, *right;
    Node(int x) {
        data = x;
        left = right = nullptr;
    }
};
*/
class Solution {
  public:
    bool areAnagrams(Node* root1, Node* root2) {
        if (!root1 && !root2) return true;
        if (!root1 || !root2) return false;
        queue<Node*> q1, q2;
        q1.push(root1);
        q2.push(root2);
        while (!q1.empty() && !q2.empty()) {
            int sz1 = q1.size(), sz2 = q2.size();
            if (sz1 != sz2) return false;
            vector<int> a, b;
            for (int i = 0; i < sz1; i++) {
                Node* n1 = q1.front(); q1.pop();
                Node* n2 = q2.front(); q2.pop();
                a.push_back(n1->data);
                b.push_back(n2->data);
                if (n1->left) q1.push(n1->left);
                if (n1->right) q1.push(n1->right);
                if (n2->left) q2.push(n2->left);
                if (n2->right) q2.push(n2->right);
            }
            sort(a.begin(), a.end());
            sort(b.begin(), b.end());
            if (a != b) return false;
        }
        return q1.empty() && q2.empty();
    }
};