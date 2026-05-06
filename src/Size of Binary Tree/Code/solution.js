/*
Definition for Node
class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
*/
/**
 * @param Node root
 * @returns number
 */
class Solution {
  getSize(root) {
    // If node does not exist, return 0
    if (root === null) {
      return 0;
    }

    // Recursively count left subtree nodes
    let leftSize = this.getSize(root.left);

    // Recursively count right subtree nodes
    let rightSize = this.getSize(root.right);

    // Return total nodes including current node
    return leftSize + rightSize + 1;
  }
}
