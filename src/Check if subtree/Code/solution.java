/*
Definition for Node
class Node {
    int data;
    Node left;
    Node right;

    Node(int x) {
        data = x;
        left = right = null;
    }
}
*/
class Solution {

    // Function to check whether two trees are identical
    boolean isSame(Node a, Node b) {

        // If both nodes are null
        // trees match till this point
        if (a == null && b == null)
            return true;

        // If one node is null
        // structures are different
        if (a == null || b == null)
            return false;

        // Values must also match
        if (a.data != b.data)
            return false;

        // Check left and right subtrees recursively
        return isSame(a.left, b.left) &&
                isSame(a.right, b.right);
    }

    public boolean isSubTree(Node root1, Node root2) {

        // Empty tree is always a subtree
        if (root2 == null)
            return true;

        // Main tree finished
        // subtree not found
        if (root1 == null)
            return false;

        // Check if trees are identical from current node
        if (isSame(root1, root2))
            return true;

        // Otherwise continue searching
        return isSubTree(root1.left, root2) ||
                isSubTree(root1.right, root2);
    }
}