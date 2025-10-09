/**
 * @param {Node} root
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
  postOrder(root) {
    const result = [];
    if (!root) return result;

    const st = []; // use array as stack
    let curr = root;
    let lastVisited = null;

    while (curr !== null || st.length > 0) {
      if (curr !== null) {
        st.push(curr);
        curr = curr.left;
      } else {
        const peekNode = st[st.length - 1];
        if (peekNode.right !== null && lastVisited !== peekNode.right) {
          curr = peekNode.right;
        } else {
          result.push(peekNode.data);
          lastVisited = peekNode;
          st.pop();
        }
      }
    }
    return result;
  }
}
