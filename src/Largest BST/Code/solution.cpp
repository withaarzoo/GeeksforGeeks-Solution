class Info {
public:
    int size, minVal, maxVal;
    bool isBST;

    Info(int s, int minV, int maxV, bool bst) {
        size = s;
        minVal = minV;
        maxVal = maxV;
        isBST = bst;
    }
};

class Solution {
  public:

    Info solve(Node* root) {
        // Base case
        if (!root)
            return Info(0, INT_MAX, INT_MIN, true);

        // Left & Right subtree info
        Info left = solve(root->left);
        Info right = solve(root->right);

        // Check BST condition
        if (left.isBST && right.isBST &&
            root->data > left.maxVal &&
            root->data < right.minVal) {

            // Current subtree is BST
            return Info(
                left.size + right.size + 1,
                min(root->data, left.minVal),
                max(root->data, right.maxVal),
                true
            );
        }

        // Not a BST
        return Info(
            max(left.size, right.size),
            INT_MIN,
            INT_MAX,
            false
        );
    }

    int largestBst(Node *root) {
        return solve(root).size;
    }
};