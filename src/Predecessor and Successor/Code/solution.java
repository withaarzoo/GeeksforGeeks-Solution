class Solution {
    public ArrayList<Node> findPreSuc(Node root, int key) {
        Node pre = null, suc = null;

        while (root != null) {
            if (root.data < key) {
                pre = root;
                root = root.right;
            } else if (root.data > key) {
                suc = root;
                root = root.left;
            } else {
                // Predecessor
                Node temp = root.left;
                while (temp != null) {
                    pre = temp;
                    temp = temp.right;
                }

                // Successor
                temp = root.right;
                while (temp != null) {
                    suc = temp;
                    temp = temp.left;
                }
                break;
            }
        }

        ArrayList<Node> res = new ArrayList<>();
        res.add(pre);
        res.add(suc);
        return res;
    }
}