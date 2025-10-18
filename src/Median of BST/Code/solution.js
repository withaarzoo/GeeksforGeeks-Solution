/*
class Node
{
    constructor(x){
        this.data=x;
        this.left=null;
        this.right=null;
    }
}
*/

/**
 * @param {Node} root
 * @return {number}
 */
class Solution {
  // Morris inorder count
  countNodes(root) {
    let count = 0;
    let curr = root;
    while (curr !== null) {
      if (curr.left === null) {
        count++; // visit
        curr = curr.right;
      } else {
        let pred = curr.left;
        while (pred.right !== null && pred.right !== curr) pred = pred.right;
        if (pred.right === null) {
          pred.right = curr; // thread
          curr = curr.left;
        } else {
          pred.right = null; // remove thread
          count++; // visit
          curr = curr.right;
        }
      }
    }
    return count;
  }

  // Morris inorder to get k-th visited node
  getKth(root, k) {
    let cnt = 0;
    let curr = root;
    while (curr !== null) {
      if (curr.left === null) {
        cnt++;
        if (cnt === k) return curr.data;
        curr = curr.right;
      } else {
        let pred = curr.left;
        while (pred.right !== null && pred.right !== curr) pred = pred.right;
        if (pred.right === null) {
          pred.right = curr;
          curr = curr.left;
        } else {
          pred.right = null;
          cnt++;
          if (cnt === k) return curr.data;
          curr = curr.right;
        }
      }
    }
    return 0;
  }

  findMedian(root) {
    if (root == null) return 0;
    const n = this.countNodes(root);
    const k = n % 2 === 1 ? Math.floor((n + 1) / 2) : Math.floor(n / 2);
    return this.getKth(root, k);
  }
}
