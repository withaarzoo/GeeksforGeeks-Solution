/* The Node structure is defined as
 class Node {
    int data;
    Node left;
    Node right;
    Node(int data){
        this.data = data;
        left = null;
        right = null;
    }
}
*/

class Solution {
    // prev stores the value of the previously visited node
    // minDiff keeps the smallest absolute difference found so far
    long prev = -1;               // -1 means "no previous node yet"
    long minDiff = Long.MAX_VALUE;

    void inorder(Node root) {
        if (root == null) return;             // base case: empty subtree

        inorder(root.left);                   // 1. finish left subtree first

        // 2. process current node
        if (prev != -1) {                     // only compute if we already saw a node
            long diff = root.data - prev;
            if (diff < minDiff) minDiff = diff;
        }
        prev = root.data;                     // remember this node for the next one

        inorder(root.right);                  // 3. now go to right subtree
    }

    public int absDiff(Node root) {
        prev = -1;                            // reset for safety
        minDiff = Long.MAX_VALUE;
        inorder(root);
        return (int)minDiff;
    }
}