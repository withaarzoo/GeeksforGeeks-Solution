/*
class Node{
    int data;
    Node left;
    Node right;
    Node(int data){
        this.data = data;
        left=null;
        right=null;
    }
} */

class Solution {
    // accumulator stores sum of nodes visited so far (greater nodes)
    private static long acc = 0;

    // recursive helper: reverse in-order traversal
    private static void dfs(Node node) {
        if (node == null) return;

        // first handle right subtree (larger elements)
        dfs(node.right);

        // replace node's data with sum of greater nodes
        int val = node.data;
        node.data = (int) acc; // acc fits in int in constraints but using long for safety

        // update accumulator to include this node's original value
        acc += val;

        // then traverse left subtree
        dfs(node.left);
    }

    public static void transformTree(Node root) {
        acc = 0;
        dfs(root);
    }
}
