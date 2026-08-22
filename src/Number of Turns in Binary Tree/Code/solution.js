/* Structure of Binary Tree Node
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
} */

/**
 * @param {Node} root
 * @param {number} p
 * @param {number} q
 * @return {number}
 */

class Solution {
  // This DFS finds a target and stores the L/R path from root to that target.
  findPath(root, target, path) {
    // An empty subtree cannot contain the target.
    if (root === null) return false;

    // Reaching the target means the current path is correct.
    if (root.data === target) return true;

    // Record the left move before exploring the left subtree.
    path.push("L");

    // Keep this move only if the target is found on the left.
    if (this.findPath(root.left, target, path)) return true;

    // Remove the failed left move before trying the right side.
    path.pop();

    // Record the right move before exploring the right subtree.
    path.push("R");

    // Keep this move only if the target is found on the right.
    if (this.findPath(root.right, target, path)) return true;

    // Remove the failed right move because this subtree did not contain the target.
    path.pop();

    // Tell the previous recursive call that the target was not found here.
    return false;
  }

  numberOfTurns(root, p, q) {
    // Store the root-to-p and root-to-q direction paths.
    const pathP = [];
    const pathQ = [];

    // Build both paths.
    this.findPath(root, p, pathP);
    this.findPath(root, q, pathQ);

    // Find the common prefix, which represents movement from root to the LCA.
    let i = 0;
    while (i < pathP.length && i < pathQ.length && pathP[i] === pathQ[i]) {
      i++;
    }

    // Build the actual direction sequence while moving from p to q.
    const path = [];

    // Move upward from p to the LCA, so read p's remaining directions backward.
    for (let j = pathP.length - 1; j >= i; j--) {
      path.push(pathP[j]);
    }

    // Move downward from the LCA to q, so keep q's remaining order unchanged.
    for (let j = i; j < pathQ.length; j++) {
      path.push(pathQ[j]);
    }

    // A path with fewer than two edges cannot contain a turn.
    if (path.length < 2) return -1;

    // Count every change between consecutive directions.
    let turns = 0;
    for (let j = 1; j < path.length; j++) {
      if (path[j] !== path[j - 1]) {
        turns++;
      }
    }

    // Return -1 when all edges in the path follow the same direction.
    return turns === 0 ? -1 : turns;
  }
}
