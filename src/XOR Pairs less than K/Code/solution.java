class Solution {
    // Trie node class
    static class Node {
        Node[] child = new Node[2];
        int cnt; // how many numbers pass through this node
    }

    // maximum bit index (0..15)
    static final int MAX_BIT = 15;

    // insert number x into trie
    private void insert(Node root, int x) {
        Node cur = root;
        for (int b = MAX_BIT; b >= 0; --b) {
            int bit = (x >> b) & 1;
            if (cur.child[bit] == null)
                cur.child[bit] = new Node();
            cur = cur.child[bit];
            cur.cnt++; // one more number passes here
        }
    }

    // count numbers y in trie such that (x XOR y) < k
    private long countLess(Node root, int x, int k) {
        Node cur = root;
        long res = 0;
        for (int b = MAX_BIT; b >= 0 && cur != null; --b) {
            int bitX = (x >> b) & 1;
            int bitK = (k >> b) & 1;

            if (bitK == 1) {
                // XOR bit 0 < 1: y's bit = bitX
                Node same = cur.child[bitX];
                if (same != null)
                    res += same.cnt;

                // XOR bit 1 == 1: y's bit = 1 - bitX, continue
                cur = cur.child[1 - bitX];
            } else {
                // bitK == 0: XOR bit must be 0, y's bit = bitX
                cur = cur.child[bitX];
            }
        }
        return res;
    }

    public int cntPairs(int[] arr, int k) {
        if (k == 0)
            return 0;

        Node root = new Node();
        long ans = 0;

        for (int x : arr) {
            ans += countLess(root, x, k);
            insert(root, x);
        }
        return (int) ans;
    }
}
