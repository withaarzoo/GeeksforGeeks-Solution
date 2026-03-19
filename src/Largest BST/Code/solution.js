class Solution {
  largestBst(root) {
    function solve(node) {
      if (!node) {
        return {
          size: 0,
          min: Infinity,
          max: -Infinity,
          isBST: true,
        };
      }

      let left = solve(node.left);
      let right = solve(node.right);

      if (
        left.isBST &&
        right.isBST &&
        node.key > left.max &&
        node.key < right.min
      ) {
        return {
          size: left.size + right.size + 1,
          min: Math.min(node.key, left.min),
          max: Math.max(node.key, right.max),
          isBST: true,
        };
      }

      return {
        size: Math.max(left.size, right.size),
        min: -Infinity,
        max: Infinity,
        isBST: false,
      };
    }

    return solve(root).size;
  }
}
