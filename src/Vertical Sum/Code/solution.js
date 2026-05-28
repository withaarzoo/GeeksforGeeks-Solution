/* Structure of binary tree node
class Node{
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
*/
class Solution {
  // DFS traversal function
  dfs(root, col, map) {
    // Stop if node does not exist
    if (root === null) return;

    // Add current node value to its column sum
    map.set(col, (map.get(col) || 0) + root.data);

    // Traverse left subtree
    this.dfs(root.left, col - 1, map);

    // Traverse right subtree
    this.dfs(root.right, col + 1, map);
  }

  verticalSum(root) {
    // Map stores column -> sum
    let map = new Map();

    // Start DFS from column 0
    this.dfs(root, 0, map);

    // Sort columns from left to right
    let sortedKeys = [...map.keys()].sort((a, b) => a - b);

    let ans = [];

    // Push sums in sorted order
    for (let key of sortedKeys) {
      ans.push(map.get(key));
    }

    return ans;
  }
}
