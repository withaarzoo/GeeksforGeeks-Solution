/* Structure for Tree Node
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
  // Helper function
  // Returns total original subtree sum
  solve(root) {
    // Base case
    if (root === null) return 0;

    // Get left subtree sum
    let leftSum = this.solve(root.left);

    // Get right subtree sum
    let rightSum = this.solve(root.right);

    // Store original value
    let originalValue = root.data;

    // Update current node
    root.data = leftSum + rightSum;

    // Return total subtree sum
    return originalValue + root.data;
  }

  toSumTree(root) {
    // Start transformation
    this.solve(root);
  }
}
