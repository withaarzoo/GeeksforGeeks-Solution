/*
Definition for Node
class Node
{
    int data;
    Node left;
    Node right;

    Node(int data)
    {
        this.data = data;
        left = null;
        right = null;
    }
}
*/
class Solution {
    public int getSize(Node root) {

        // If node is null, no node exists here
        if (root == null) {
            return 0;
        }

        // Count nodes in left subtree
        int leftSize = getSize(root.left);

        // Count nodes in right subtree
        int rightSize = getSize(root.right);

        // Add left subtree, right subtree, and current node
        return leftSize + rightSize + 1;
    }
}