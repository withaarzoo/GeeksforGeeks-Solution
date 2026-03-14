/**
 * @param {Node} root
 * @returns {number[]}
 */

class Solution {
  topView(root) {
    if (!root) return [];

    let map = new Map();
    let queue = [[root, 0]];

    while (queue.length > 0) {
      let [node, hd] = queue.shift();

      if (!map.has(hd)) map.set(hd, node.data);

      if (node.left) queue.push([node.left, hd - 1]);

      if (node.right) queue.push([node.right, hd + 1]);
    }

    let sortedKeys = [...map.keys()].sort((a, b) => a - b);

    let result = [];
    for (let key of sortedKeys) result.push(map.get(key));

    return result;
  }
}
