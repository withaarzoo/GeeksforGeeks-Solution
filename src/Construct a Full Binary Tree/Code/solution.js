/* Structure of Binary Tree Node
class Node
{
    constructor(val){
        this.data = val;
        this.left = null;
        this.right = null;
    }
} */

class Solution {
  constructBinaryTree(pre, preMirror) {
    // Store positions of every value
    const prePos = new Map();
    const mirrorPos = new Map();

    for (let i = 0; i < pre.length; i++) prePos.set(pre[i], i);

    for (let i = 0; i < preMirror.length; i++) mirrorPos.set(preMirror[i], i);

    // Recursive helper
    const build = (ps, pe, ms, me) => {
      // Empty range
      if (ps > pe) return null;

      // Create current root
      const root = new Node(pre[ps]);

      // Leaf node
      if (ps === pe) return root;

      // Left child in preorder
      const leftRoot = pre[ps + 1];

      // Right child in mirror preorder
      const rightRoot = preMirror[ms + 1];

      // Position of right subtree root
      const rightPos = prePos.get(rightRoot);

      // Left subtree size
      const leftSize = rightPos - (ps + 1);

      // Build left subtree
      root.left = build(ps + 1, ps + leftSize, mirrorPos.get(leftRoot), me);

      // Build right subtree
      root.right = build(
        ps + leftSize + 1,
        pe,
        ms + 1,
        mirrorPos.get(rightRoot),
      );

      return root;
    };

    // Build the complete tree
    return build(0, pre.length - 1, 0, preMirror.length - 1);
  }
}
