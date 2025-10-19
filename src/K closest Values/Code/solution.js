/**
 * @param {Node} root
 * @param {number} target
 * @param {number} k
 * @returns {number[]}
 */

/*
class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
  initPred(root, target, st) {
    while (root) {
      if (root.data <= target) {
        st.push(root);
        root = root.right;
      } else {
        root = root.left;
      }
    }
  }
  initSucc(root, target, st) {
    while (root) {
      if (root.data > target) {
        st.push(root);
        root = root.left;
      } else {
        root = root.right;
      }
    }
  }
  getNextPred(st) {
    const node = st.pop();
    const val = node.data;
    let cur = node.left;
    while (cur) {
      st.push(cur);
      cur = cur.right;
    }
    return val;
  }
  getNextSucc(st) {
    const node = st.pop();
    const val = node.data;
    let cur = node.right;
    while (cur) {
      st.push(cur);
      cur = cur.left;
    }
    return val;
  }

  getKClosest(root, target, k) {
    const res = [];
    if (!root || k <= 0) return res;

    const pred = [];
    const succ = [];
    this.initPred(root, target, pred);
    this.initSucc(root, target, succ);

    while (k-- > 0) {
      if (pred.length === 0 && succ.length === 0) break;
      else if (pred.length === 0) res.push(this.getNextSucc(succ));
      else if (succ.length === 0) res.push(this.getNextPred(pred));
      else {
        const pval = pred[pred.length - 1].data;
        const sval = succ[succ.length - 1].data;
        const pdiff = Math.abs(pval - target);
        const sdiff = Math.abs(sval - target);
        if (pdiff <= sdiff)
          res.push(this.getNextPred(pred)); // tie -> pred (smaller)
        else res.push(this.getNextSucc(succ));
      }
    }
    return res;
  }
}
