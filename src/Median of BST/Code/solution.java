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
    // Morris traversal to count nodes
    private int countNodes(Node root) {
        int count = 0;
        Node curr = root;
        while (curr != null) {
            if (curr.left == null) {
                count++;             // visit
                curr = curr.right;
            } else {
                Node pred = curr.left;
                while (pred.right != null && pred.right != curr)
                    pred = pred.right;
                if (pred.right == null) {
                    pred.right = curr; // make thread
                    curr = curr.left;
                } else {
                    pred.right = null; // remove thread
                    count++;           // visit
                    curr = curr.right;
                }
            }
        }
        return count;
    }

    // Morris traversal to get k-th visited node value
    private int getKth(Node root, int k) {
        int cnt = 0;
        Node curr = root;
        while (curr != null) {
            if (curr.left == null) {
                cnt++;
                if (cnt == k) return curr.data;
                curr = curr.right;
            } else {
                Node pred = curr.left;
                while (pred.right != null && pred.right != curr)
                    pred = pred.right;
                if (pred.right == null) {
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    pred.right = null;
                    cnt++;
                    if (cnt == k) return curr.data;
                    curr = curr.right;
                }
            }
        }
        return 0; // fallback
    }

    public int findMedian(Node root) {
        if (root == null) return 0;
        int n = countNodes(root);
        int k = (n % 2 == 1) ? (n + 1) / 2 : (n / 2);
        return getKth(root, k);
    }
}
