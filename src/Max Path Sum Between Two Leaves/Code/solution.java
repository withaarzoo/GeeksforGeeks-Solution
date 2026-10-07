/* Node Structure
class Node
{
    int data;
    Node left, right;
    Node(int item)
    {
        data = item;
        left = right = null;
    }
} */
class Solution {
    public int maxPathSum(Node root) {
        int[] res = {Integer.MIN_VALUE};
        helper(root, res);
        return res[0] == Integer.MIN_VALUE ? -1 : res[0];
    }
    
    private int helper(Node node, int[] res) {
        if (node == null) return 0;
        if (node.left == null && node.right == null) return node.data;
        
        int left = helper(node.left, res);
        int right = helper(node.right, res);
        
        if (node.left != null && node.right != null) {
            res[0] = Math.max(res[0], left + right + node.data);
            return Math.max(left, right) + node.data;
        }
        return (node.left != null ? left : right) + node.data;
    }
}