/*
class Node {
    int data;
    Node left, right;

    Node(int val) {
        data = val;
        left = right = null;
    }
}
*/

import java.util.*;

class Solution {
    public Node constructTree(int[] pre, int[] post) {
        int n = pre.length;
        if (n == 0) return null;
        Map<Integer,Integer> pos = new HashMap<>();
        for (int i = 0; i < n; ++i) pos.put(post[i], i);
        return build(pre, post, 0, n - 1, 0, n - 1, pos);
    }

    private Node build(int[] pre, int[] post, int preL, int preR, int postL, int postR, Map<Integer,Integer> pos) {
        if (preL > preR || postL > postR) return null;
        Node root = new Node(pre[preL]);             // root from preorder
        if (preL == preR) return root;               // leaf node
        int leftRootVal = pre[preL + 1];             // root of left subtree
        int idx = pos.get(leftRootVal);              // index in postorder
        int leftSize = idx - postL + 1;              // number of nodes in left subtree
        root.left  = build(pre, post, preL + 1, preL + leftSize, postL, idx, pos);
        root.right = build(pre, post, preL + leftSize + 1, preR, idx + 1, postR - 1, pos);
        return root;
    }
}
