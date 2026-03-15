class Solution {
  verticalOrder(root) {
    if (!root) return [];

    const map = new Map();
    const queue = [[root, 0]];

    let min = 0,
      max = 0;

    while (queue.length) {
      const [node, hd] = queue.shift();

      if (!map.has(hd)) map.set(hd, []);
      map.get(hd).push(node.data);

      min = Math.min(min, hd);
      max = Math.max(max, hd);

      if (node.left) queue.push([node.left, hd - 1]);

      if (node.right) queue.push([node.right, hd + 1]);
    }

    const result = [];

    for (let i = min; i <= max; i++) {
      if (map.has(i)) result.push(map.get(i));
    }

    return result;
  }
}
