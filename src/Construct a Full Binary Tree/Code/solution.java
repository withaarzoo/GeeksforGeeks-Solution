/* Structure of Binary Tree Node
class Node {
    int data;
    Node left, right;

    Node(int val) {
        data = val;
        left = right = null;
    }
} */

import java.util.*;

class Solution {

    HashMap<Integer, Integer> prePos = new HashMap<>();
    HashMap<Integer, Integer> mirrorPos = new HashMap<>();

    // Recursively constructs the tree
    private Node build(int[] pre, int[] mirror,
                       int ps, int pe, int ms, int me) {

        // Empty range
        if (ps > pe) return null;

        // Create current root
        Node root = new Node(pre[ps]);

        // Leaf node
        if (ps == pe) return root;

        // Left child in preorder
        int leftRoot = pre[ps + 1];

        // Right child in mirror preorder
        int rightRoot = mirror[ms + 1];

        // Position of right subtree root
        int rightPos = prePos.get(rightRoot);

        // Size of left subtree
        int leftSize = rightPos - (ps + 1);

        // Build left subtree
        root.left = build(pre, mirror,
                ps + 1, ps + leftSize,
                mirrorPos.get(leftRoot), me);

        // Build right subtree
        root.right = build(pre, mirror,
                ps + leftSize + 1, pe,
                ms + 1, mirrorPos.get(rightRoot));

        return root;
    }

    public Node constructBinaryTree(int[] pre, int[] preMirror) {

        int n = pre.length;

        // Store preorder indices
        for (int i = 0; i < n; i++)
            prePos.put(pre[i], i);

        // Store mirror preorder indices
        for (int i = 0; i < n; i++)
            mirrorPos.put(preMirror[i], i);

        // Construct and return the tree
        return build(pre, preMirror, 0, n - 1, 0, n - 1);
    }
}