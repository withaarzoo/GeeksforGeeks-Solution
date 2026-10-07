/* Node Structure
class Node {
    int data;
    Node left;
    Node right;
    Node(int data) {
        this.data = data;
        left = nullptr;
        right = nullptr;
    }
}
*/
class Solution {
  public:
    int maxPathSum(Node *root) {
        int res = INT_MIN;
        helper(root, res);
        return res == INT_MIN ? -1 : res;
    }
    
  private:
    int helper(Node* node, int& res) {
        if (!node) return 0;
        if (!node->left && !node->right) return node->data;
        
        int left = helper(node->left, res);
        int right = helper(node->right, res);
        
        if (node->left && node->right) {
            res = max(res, left + right + node->data);
            return max(left, right) + node->data;
        }
        return (node->left ? left : right) + node->data;
    }
};