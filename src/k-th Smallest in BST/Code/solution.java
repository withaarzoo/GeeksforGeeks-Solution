/*
class Node {
    int data;
    Node left, right;

    public Node(int d)
    {
        data = d;
        left = right = null;
    }
}
*/

import java.util.Stack;

class Solution {
    public int kthSmallest(Node root, int k) {
        // Iterative inorder traversal using a stack
        Stack<Node> st = new Stack<>();
        Node curr = root;

        while (curr != null || !st.isEmpty()) {
            // go to leftmost node
            while (curr != null) {
                st.push(curr);
                curr = curr.left;
            }

            // visit node
            curr = st.pop();
            k--;
            if (k == 0) return curr.data; // found k-th smallest

            // go to right subtree
            curr = curr.right;
        }

        // k is greater than number of nodes
        return -1;
    }
}
