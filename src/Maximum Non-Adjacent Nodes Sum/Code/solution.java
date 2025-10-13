/*
class Node {
    int data;
    Node left, right;

    Node(int data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
    // helper to hold pair values
    private static class Pair {
        long take;    // best when taking this node
        long notTake; // best when not taking this node
        Pair(long t, long nt) { take = t; notTake = nt; }
    }

    private Pair dfs(Node root) {
        if (root == null) return new Pair(0L, 0L);
        Pair L = dfs(root.left);
        Pair R = dfs(root.right);

        long take = root.data + L.notTake + R.notTake;
        long notTake = Math.max(L.take, L.notTake) + Math.max(R.take, R.notTake);
        return new Pair(take, notTake);
    }

    public int getMaxSum(Node root) {
        Pair ans = dfs(root);
        long res = Math.max(ans.take, ans.notTake);
        return (int)res; // cast to int to match required return type
    }
} 
