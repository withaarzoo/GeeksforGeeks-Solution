class Info {
    int size, min, max;
    boolean isBST;

    Info(int s, int min, int max, boolean bst) {
        this.size = s;
        this.min = min;
        this.max = max;
        this.isBST = bst;
    }
}

class Solution {

    static Info solve(Node root) {
        if (root == null)
            return new Info(0, Integer.MAX_VALUE, Integer.MIN_VALUE, true);

        Info left = solve(root.left);
        Info right = solve(root.right);

        if (left.isBST && right.isBST &&
                root.data > left.max &&
                root.data < right.min) {

            return new Info(
                    left.size + right.size + 1,
                    Math.min(root.data, left.min),
                    Math.max(root.data, right.max),
                    true);
        }

        return new Info(
                Math.max(left.size, right.size),
                Integer.MIN_VALUE,
                Integer.MAX_VALUE,
                false);
    }

    static int largestBst(Node root) {
        return solve(root).size;
    }
}