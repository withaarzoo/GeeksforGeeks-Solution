/* Binary Tree Node Structure
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/

/**
 * @param {Node} root
 * @return s {number}
 */

class Solution {
    // prev stores the value of the previously visited node
    // minDiff keeps the smallest absolute difference found so far
    constructor() {
        this.prev = -1;                       // -1 means "no previous node yet"
        this.minDiff = Number.MAX_SAFE_INTEGER;
    }

    inorder(root) {
        if (!root) return;                    // base case: empty subtree

        this.inorder(root.left);              // 1. finish left subtree first

        // 2. process current node
        if (this.prev !== -1) {               // only compute if we already saw a node
            let diff = root.data - this.prev;
            if (diff < this.minDiff) this.minDiff = diff;
        }
        this.prev = root.data;                // remember this node for the next one

        this.inorder(root.right);             // 3. now go to right subtree
    }

    absDiff(root) {
        this.prev = -1;                       // reset for safety
        this.minDiff = Number.MAX_SAFE_INTEGER;
        this.inorder(root);
        return this.minDiff;
    }
}