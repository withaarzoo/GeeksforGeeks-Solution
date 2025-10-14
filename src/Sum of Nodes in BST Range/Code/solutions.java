/*
class Node {
    int data;
    Node left, right;
    Node(int val) {
        data = val;
        left = right = null;
    }
}
*/

class Solution {
    public int nodeSum(Node root, int l, int r) {
        if (root == null) return 0;               // base case
        // If current node value is less than l, skip left subtree
        if (root.data < l) return nodeSum(root.right, l, r);
        // If current node value is greater than r, skip right subtree
        if (root.data > r) return nodeSum(root.left, l, r);
        // Current node is inside range: include it and search both sides
        return root.data + nodeSum(root.left, l, r) + nodeSum(root.right, l, r);
    }
}
