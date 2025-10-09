/*
class Node {
    int data;
    Node left, right;
    Node(int val){
        data = val;
        left = right = null;
    }
}
*/

import java.util.ArrayList;
import java.util.Stack;

class Solution {
    public ArrayList<Integer> postOrder(Node root) {
        ArrayList<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Stack<Node> st = new Stack<>();
        Node curr = root;
        Node lastVisited = null;

        while (curr != null || !st.isEmpty()) {
            if (curr != null) {
                st.push(curr);
                curr = curr.left;
            } else {
                Node peekNode = st.peek();
                // If right child exists and hasn't been visited, move to right child
                if (peekNode.right != null && lastVisited != peekNode.right) {
                    curr = peekNode.right;
                } else {
                    // Visit the node
                    result.add(peekNode.data);
                    lastVisited = peekNode;
                    st.pop();
                }
            }
        }
        return result;
    }
}
