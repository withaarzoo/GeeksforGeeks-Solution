/* Structure of a Binary Search Tree node
class Node {
    int data;
    Node left, right;

    public Node(int val) {
        data = val;
        left = right = null;
    }
}
*/

class Solution {
    public int minDiff(Node root, int k) {
        int ans = Integer.MAX_VALUE;
        while (root != null) {
            ans = Math.min(ans, Math.abs(root.data - k));
            if (root.data == k) return 0;
            if (k < root.data) root = root.left;
            else root = root.right;
        }
        return ans;
    }
}