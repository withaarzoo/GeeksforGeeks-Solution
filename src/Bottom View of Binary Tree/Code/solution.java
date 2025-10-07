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
    // helper class to store node with its horizontal distance
    private static class QNode {
        Node node;
        int hd;
        QNode(Node n, int h) { node = n; hd = h; }
    }

    public ArrayList<Integer> bottomView(Node root) {
        ArrayList<Integer> result = new ArrayList<>();
        if (root == null) return result;

        HashMap<Integer, Integer> hdValue = new HashMap<>(); // hd -> last seen node data
        Queue<QNode> q = new LinkedList<>();
        int minHd = 0, maxHd = 0;

        q.add(new QNode(root, 0));

        while (!q.isEmpty()) {
            QNode cur = q.poll();
            Node node = cur.node;
            int hd = cur.hd;

            // overwrite value for this horizontal distance
            hdValue.put(hd, node.data);

            if (node.left != null) {
                q.add(new QNode(node.left, hd - 1));
                if (hd - 1 < minHd) minHd = hd - 1;
            }
            if (node.right != null) {
                q.add(new QNode(node.right, hd + 1));
                if (hd + 1 > maxHd) maxHd = hd + 1;
            }
        }

        for (int hd = minHd; hd <= maxHd; ++hd) {
            result.add(hdValue.get(hd));
        }
        return result;
    }
}
