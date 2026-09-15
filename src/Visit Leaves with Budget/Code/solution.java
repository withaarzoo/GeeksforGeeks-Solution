/* Binary Tree Node Structure
class Node {
    int data;
    Node left, right;

    public Node(int data){
        this.data = data;
    }
}
*/
class Solution {
    // helper that walks the tree and records every leaf depth
    void collect(Node node, int depth, ArrayList<Integer> leaves) {
        if (node == null) return;
        if (node.left == null && node.right == null) { // leaf found
            leaves.add(depth);
            return;
        }
        collect(node.left, depth + 1, leaves);   // left child is one level deeper
        collect(node.right, depth + 1, leaves);  // right child is one level deeper
    }

    public int getCount(Node root, int k) {
        ArrayList<Integer> leaves = new ArrayList<>();
        collect(root, 1, leaves);                // start from level 1
        Collections.sort(leaves);                // ascending order so cheapest come first
        int count = 0;
        for (int cost : leaves) {
            if (cost > k) break;                 // budget exhausted
            k -= cost;
            count++;
        }
        return count;
    }
}