/*
class Node {
    int data;
    Node left,right;
    Node(int d)
    {
        data=d;
        left=right=null;
    }
}
*/

import java.util.*;

class Solution {
    ArrayList<Integer> zigZagTraversal(Node root) {
        ArrayList<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Queue<Node> q = new LinkedList<>();
        q.add(root);
        boolean leftToRight = true;

        while (!q.isEmpty()) {
            int levelSize = q.size();
            LinkedList<Integer> levelVals = new LinkedList<>(); // LinkedList for addFirst/addLast

            for (int i = 0; i < levelSize; i++) {
                Node node = q.poll();

                if (leftToRight) levelVals.addLast(node.data);
                else levelVals.addFirst(node.data);

                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }

            result.addAll(levelVals);
            leftToRight = !leftToRight;
        }

        return result;
    }
}
