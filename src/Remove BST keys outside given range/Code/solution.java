/*
class Node {
    int data;
    Node left;
    Node right;
    Node(int data){
        this.data = data;
        left=null;
        right=null;
    }
}
*/

class Solution {
    Node removekeys(Node root, int l, int r) {
        if (root == null) return null;

        // If value is less than l, ignore left subtree and process right subtree
        if (root.data < l) {
            return removekeys(root.right, l, r);
        }

        // If value is greater than r, ignore right subtree and process left subtree
        if (root.data > r) {
            return removekeys(root.left, l, r);
        }

        // Node is within range, recursively trim left and right
        root.left = removekeys(root.left, l, r);
        root.right = removekeys(root.right, l, r);
        return root;
    }
}
