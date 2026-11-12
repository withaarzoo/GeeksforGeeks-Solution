/* Structure of a Binary Search Tree node
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
 * @param {number} k
 * @return {number}
 */

class Solution {
    minDiff(root, k) {
        let ans = 1e9;
        while (root) {
            ans = Math.min(ans, Math.abs(root.data - k));
            if (root.data === k) return 0;
            if (k < root.data) root = root.left;
            else root = root.right;
        }
        return ans;
    }
}