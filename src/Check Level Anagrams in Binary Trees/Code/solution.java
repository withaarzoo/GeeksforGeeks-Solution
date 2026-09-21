/* Structure of binary tree Node
class Node {
    int data;
    Node left, right;
    Node(int x) {
        data = x;
        left = right = null;
    }
}
*/
class Solution {
    public boolean areAnagrams(Node root1, Node root2) {
        if (root1 == null && root2 == null) return true;
        if (root1 == null || root2 == null) return false;
        Queue<Node> q1 = new LinkedList<>();
        Queue<Node> q2 = new LinkedList<>();
        q1.offer(root1);
        q2.offer(root2);
        while (!q1.isEmpty() && !q2.isEmpty()) {
            int sz1 = q1.size(), sz2 = q2.size();
            if (sz1 != sz2) return false;
            List<Integer> a = new ArrayList<>();
            List<Integer> b = new ArrayList<>();
            for (int i = 0; i < sz1; i++) {
                Node n1 = q1.poll();
                Node n2 = q2.poll();
                a.add(n1.data);
                b.add(n2.data);
                if (n1.left != null) q1.offer(n1.left);
                if (n1.right != null) q1.offer(n1.right);
                if (n2.left != null) q2.offer(n2.left);
                if (n2.right != null) q2.offer(n2.right);
            }
            Collections.sort(a);
            Collections.sort(b);
            if (!a.equals(b)) return false;
        }
        return q1.isEmpty() && q2.isEmpty();
    }
}