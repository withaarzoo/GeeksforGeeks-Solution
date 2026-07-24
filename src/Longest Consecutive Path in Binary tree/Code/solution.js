/* Structure of Binary Tree Node
class Node
{
    constructor(x){
        this.data = x;
        this.left = null;
        this.right = null;
    }
}
*/

/**
 * @param {Node} root
 * @return {number}
 */
class Solution {

    constructor() {
        // Stores the maximum consecutive path length
        this.ans = 1;
    }

    // DFS traversal
    dfs(node, parentValue, length) {

        // Stop if node is null
        if (node === null) return;

        // Check whether the sequence continues
        if (node.data === parentValue + 1)
            length++;
        else
            // Otherwise start a new sequence
            length = 1;

        // Update the answer
        this.ans = Math.max(this.ans, length);

        // Traverse left subtree
        this.dfs(node.left, node.data, length);

        // Traverse right subtree
        this.dfs(node.right, node.data, length);
    }

    longestConsecutive(root) {

        // Empty tree
        if (root === null) return -1;

        // Start DFS from root
        this.dfs(root, root.data - 1, 0);

        // Return -1 if no valid path exists
        return this.ans === 1 ? -1 : this.ans;
    }
}