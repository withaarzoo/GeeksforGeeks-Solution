/*
class Node {
public:
    int data;
    Node* left;
    Node* right;
    Node(int val) {
        data = val;
        left = nullptr;
        right = nullptr;
    }
};
*/

class Solution {
  private:
    // returns pair {take, notTake}
    pair<long long, long long> dfs(Node* root) {
        if (!root) return {0LL, 0LL};
        auto left = dfs(root->left);
        auto right = dfs(root->right);

        // If we take this node, we cannot take immediate children
        long long take = root->data + left.second + right.second;
        // If we don't take this node, children can be either taken or not
        long long notTake = max(left.first, left.second) + max(right.first, right.second);

        return {take, notTake};
    }
  public:
    int getMaxSum(Node *root) {
        auto res = dfs(root);
        long long ans = max(res.first, res.second);
        return (int)ans; // fits in int as per constraints, cast for signature
    }
};
