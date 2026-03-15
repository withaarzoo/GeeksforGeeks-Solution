class Solution {
    public ArrayList<ArrayList<Integer>> verticalOrder(Node root) {

        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        if (root == null)
            return result;

        // Map to store vertical lines
        TreeMap<Integer, ArrayList<Integer>> map = new TreeMap<>();

        // Queue for BFS
        Queue<Pair> queue = new LinkedList<>();
        queue.add(new Pair(root, 0));

        while (!queue.isEmpty()) {

            Pair p = queue.poll();
            Node node = p.node;
            int hd = p.hd;

            map.putIfAbsent(hd, new ArrayList<>());
            map.get(hd).add(node.data);

            if (node.left != null)
                queue.add(new Pair(node.left, hd - 1));

            if (node.right != null)
                queue.add(new Pair(node.right, hd + 1));
        }

        for (ArrayList<Integer> list : map.values()) {
            result.add(list);
        }

        return result;
    }
}

class Pair {
    Node node;
    int hd;

    Pair(Node n, int h) {
        node = n;
        hd = h;
    }
}