class Solution {

    public Node markParents(Node root, HashMap<Node, Node> parent, int target) {
        Queue<Node> q = new LinkedList<>();
        q.add(root);

        Node targetNode = null;

        while (!q.isEmpty()) {
            Node curr = q.poll();

            if (curr.data == target)
                targetNode = curr;

            if (curr.left != null) {
                parent.put(curr.left, curr);
                q.add(curr.left);
            }

            if (curr.right != null) {
                parent.put(curr.right, curr);
                q.add(curr.right);
            }
        }

        return targetNode;
    }

    public int minTime(Node root, int target) {

        HashMap<Node, Node> parent = new HashMap<>();
        Node targetNode = markParents(root, parent, target);

        HashSet<Node> visited = new HashSet<>();
        Queue<Node> q = new LinkedList<>();

        q.add(targetNode);
        visited.add(targetNode);

        int time = 0;

        while (!q.isEmpty()) {
            int size = q.size();
            boolean burned = false;

            for (int i = 0; i < size; i++) {
                Node curr = q.poll();

                if (curr.left != null && !visited.contains(curr.left)) {
                    burned = true;
                    visited.add(curr.left);
                    q.add(curr.left);
                }

                if (curr.right != null && !visited.contains(curr.right)) {
                    burned = true;
                    visited.add(curr.right);
                    q.add(curr.right);
                }

                if (parent.get(curr) != null && !visited.contains(parent.get(curr))) {
                    burned = true;
                    visited.add(parent.get(curr));
                    q.add(parent.get(curr));
                }
            }

            if (burned)
                time++;
        }

        return time;
    }
}