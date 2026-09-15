/* Binary Tree Node Structure
class Node{
    constructor(data){
        this.data = data;
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
    // helper that walks the tree and records every leaf depth
    collect(node, depth, leaves) {
        if (!node) return;
        if (!node.left && !node.right) {       // leaf
            leaves.push(depth);
            return;
        }
        this.collect(node.left, depth + 1, leaves);
        this.collect(node.right, depth + 1, leaves);
    }

    getCount(root, k) {
        let leaves = [];
        this.collect(root, 1, leaves);         // root is level 1
        leaves.sort((a, b) => a - b);          // cheapest first
        let count = 0;
        for (let cost of leaves) {
            if (cost > k) break;
            k -= cost;
            count++;
        }
        return count;
    }
}