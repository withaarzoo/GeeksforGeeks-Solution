/*
class Node {
    int data;
    Node left;
    Node right;

    Node(int data) {
        this.data = data;
        left = null;
        right = null;
    }
}
*/

import java.util.*;

class Solution {
    // initialize predecessor stack: nodes with val <= target
    private void initPred(Node root, int target, Deque<Node> st) {
        while (root != null) {
            if (root.data <= target) {
                st.push(root);
                root = root.right;
            } else root = root.left;
        }
    }
    // initialize successor stack: nodes with val > target
    private void initSucc(Node root, int target, Deque<Node> st) {
        while (root != null) {
            if (root.data > target) {
                st.push(root);
                root = root.left;
            } else root = root.right;
        }
    }
    // next predecessor
    private int getNextPred(Deque<Node> st) {
        Node node = st.pop();
        int val = node.data;
        node = node.left;
        while (node != null) {
            st.push(node);
            node = node.right;
        }
        return val;
    }
    // next successor
    private int getNextSucc(Deque<Node> st) {
        Node node = st.pop();
        int val = node.data;
        node = node.right;
        while (node != null) {
            st.push(node);
            node = node.left;
        }
        return val;
    }

    public ArrayList<Integer> getKClosest(Node root, int target, int k) {
        ArrayList<Integer> res = new ArrayList<>();
        if (root == null || k <= 0) return res;

        Deque<Node> pred = new ArrayDeque<>();
        Deque<Node> succ = new ArrayDeque<>();
        initPred(root, target, pred);
        initSucc(root, target, succ);

        while (k-- > 0) {
            if (pred.isEmpty() && succ.isEmpty()) break;
            else if (pred.isEmpty()) res.add(getNextSucc(succ));
            else if (succ.isEmpty()) res.add(getNextPred(pred));
            else {
                int pval = pred.peek().data;
                int sval = succ.peek().data;
                int pdiff = Math.abs(pval - target);
                int sdiff = Math.abs(sval - target);
                // tie -> choose smaller (predecessor)
                if (pdiff <= sdiff) res.add(getNextPred(pred));
                else res.add(getNextSucc(succ));
            }
        }
        return res;
    }
}
