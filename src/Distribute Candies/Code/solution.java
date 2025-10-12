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

class Solution {
    private long moves = 0; // accumulate total moves

    // helper returns the balance for the subtree rooted at node
    private int dfs(Node node) {
        if (node == null) return 0;
        int leftBal = dfs(node.left);
        int rightBal = dfs(node.right);

        moves += Math.abs(leftBal) + Math.abs(rightBal); // moves to/from children

        int balance = node.data + leftBal + rightBal - 1; // after each node keeps 1 candy
        return balance;
    }

    public int distCandy(Node root) {
        moves = 0;
        dfs(root);
        return (int)moves;
    }
}
