/**
 * @param {Node} root
 * @returns {number[]}
 */

/*
class Node{
    constructor(val){
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
  zigZagTraversal(root) {
    const result = [];
    if (root == null) return result;

    // Use array as a queue with a front pointer to avoid costly shifts
    const queue = [root];
    let front = 0;
    let leftToRight = true;

    while (front < queue.length) {
      const levelSize = queue.length - front;
      const levelVals = new Array(levelSize); // fill by index to keep O(1) writes

      for (let i = 0; i < levelSize; ++i) {
        const node = queue[front++];
        const pos = leftToRight ? i : levelSize - 1 - i;
        levelVals[pos] = node.data;

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      for (const v of levelVals) result.push(v);
      leftToRight = !leftToRight;
    }

    return result;
  }
}
