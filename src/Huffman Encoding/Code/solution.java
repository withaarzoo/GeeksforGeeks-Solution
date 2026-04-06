class Solution {

    class Node {
        int freq;
        int idx;
        Node left, right;

        Node(int freq, int idx) {
            this.freq = freq;
            this.idx = idx;
            this.left = null;
            this.right = null;
        }
    }

    void buildCodes(Node root, String code, ArrayList<String> ans) {
        if (root == null)
            return;

        // Leaf node
        if (root.left == null && root.right == null) {
            ans.add(code);
            return;
        }

        buildCodes(root.left, code + "0", ans);
        buildCodes(root.right, code + "1", ans);
    }

    public ArrayList<String> huffmanCodes(String s, int f[]) {
        int n = s.length();

        PriorityQueue<Node> pq = new PriorityQueue<>((a, b) -> {
            if (a.freq == b.freq)
                return a.idx - b.idx;

            return a.freq - b.freq;
        });

        // Insert all characters into heap
        for (int i = 0; i < n; i++) {
            pq.offer(new Node(f[i], i));
        }

        // Special case
        if (n == 1) {
            ArrayList<String> single = new ArrayList<>();
            single.add("0");
            return single;
        }

        // Build Huffman Tree
        while (pq.size() > 1) {
            Node left = pq.poll();
            Node right = pq.poll();

            Node parent = new Node(
                    left.freq + right.freq,
                    Math.min(left.idx, right.idx));

            parent.left = left;
            parent.right = right;

            pq.offer(parent);
        }

        ArrayList<String> ans = new ArrayList<>();
        buildCodes(pq.peek(), "", ans);

        return ans;
    }
}