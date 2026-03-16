class Solution {
  dfs(node, currSum, k, map) {
    if (node === null) return 0;

    currSum += node.data;
    let count = 0;

    if (currSum === k) count++;

    if (map.has(currSum - k)) count += map.get(currSum - k);

    map.set(currSum, (map.get(currSum) || 0) + 1);

    count += this.dfs(node.left, currSum, k, map);
    count += this.dfs(node.right, currSum, k, map);

    map.set(currSum, map.get(currSum) - 1);

    return count;
  }

  countAllPaths(root, k) {
    let map = new Map();
    return this.dfs(root, 0, k, map);
  }
}
