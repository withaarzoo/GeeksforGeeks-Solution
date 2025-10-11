/*
class Node{
    int data;
    Node left, right;
    Node(int d){
        data=d;
        left=right=null;
    }
}
*/

class Solution {
    private int globalMax;

    // dfs returns max downward-sum from node to its parent
    private int dfs(Node node) {
        if (node == null) return 0;

        int left = Math.max(0, dfs(node.left));   // ignore negative left contributions
        int right = Math.max(0, dfs(node.right)); // ignore negative right contributions

        // best path that passes through this node
        int current = node.data + left + right;
        globalMax = Math.max(globalMax, current);

        // return best single path to parent
        return node.data + Math.max(left, right);
    }

    int findMaxSum(Node root) {
        if (root == null) return 0;
        globalMax = Integer.MIN_VALUE;
        dfs(root);
        return globalMax;
    }
}
