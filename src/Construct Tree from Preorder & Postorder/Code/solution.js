/*
class Node
{
    constructor(x){
        this.data = x;
        this.left = null;
        this.right = null;
    }
}
*/

/**
 * @param {number[]} pre
 * @param {number[]} post
 * @return {Node}
 */

class Solution {
  constructTree(pre, post) {
    const n = pre.length;
    if (n === 0) return null;
    const pos = new Map();
    for (let i = 0; i < n; ++i) pos.set(post[i], i);

    const build = (preL, preR, postL, postR) => {
      if (preL > preR || postL > postR) return null;
      const root = new Node(pre[preL]); // root from preorder
      if (preL === preR) return root; // leaf
      const leftRootVal = pre[preL + 1]; // left subtree root
      const idx = pos.get(leftRootVal); // find in postorder
      const leftSize = idx - postL + 1; // size of left subtree
      root.left = build(preL + 1, preL + leftSize, postL, idx);
      root.right = build(preL + leftSize + 1, preR, idx + 1, postR - 1);
      return root;
    };

    return build(0, n - 1, 0, n - 1);
  }
}
