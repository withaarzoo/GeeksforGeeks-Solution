/* Structure of binary tree node
class Node{
public:
    int data;
    Node left, right;
    Node(int item)
    {
        data = item;
        left = right = null;
    }
}
*/
class Solution {

    // DFS traversal function
    void dfs(Node root, int col, TreeMap<Integer, Integer> map) {

        // If node is null, stop recursion
        if (root == null)
            return;

        // Add node value into current vertical column
        map.put(col, map.getOrDefault(col, 0) + root.data);

        // Traverse left side
        dfs(root.left, col - 1, map);

        // Traverse right side
        dfs(root.right, col + 1, map);
    }

    public ArrayList<Integer> verticalSum(Node root) {

        // TreeMap keeps keys sorted automatically
        TreeMap<Integer, Integer> map = new TreeMap<>();

        // Start traversal from column 0
        dfs(root, 0, map);

        ArrayList<Integer> ans = new ArrayList<>();

        // Store sums in sorted vertical order
        for (int value : map.values()) {
            ans.add(value);
        }

        return ans;
    }
}