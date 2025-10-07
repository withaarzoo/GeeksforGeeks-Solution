/**
 * @param {Node} root
 * @returns {number[]}
 */

/*
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
  bottomView(root) {
    const result = [];
    if (!root) return result;

    const hdValue = new Map(); // hd -> last seen node value
    // use an array as queue with head index for O(1) amortized operations
    const q = [];
    let head = 0;
    q.push([root, 0]);

    let minHd = 0,
      maxHd = 0;

    while (head < q.length) {
      const [node, hd] = q[head++];
      // overwrite for this hd (BFS ensures later level/order overwrites earlier)
      hdValue.set(hd, node.data);

      if (node.left) {
        q.push([node.left, hd - 1]);
        if (hd - 1 < minHd) minHd = hd - 1;
      }
      if (node.right) {
        q.push([node.right, hd + 1]);
        if (hd + 1 > maxHd) maxHd = hd + 1;
      }
    }

    for (let hd = minHd; hd <= maxHd; ++hd) {
      result.push(hdValue.get(hd));
    }
    return result;
  }
}
