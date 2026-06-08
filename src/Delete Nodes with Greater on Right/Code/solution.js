/* Structure of linked list node
class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}
*/

class Solution {
  // Reverse linked list
  reverseList(head) {
    let prev = null;
    let curr = head;

    while (curr) {
      let nextNode = curr.next; // save next node
      curr.next = prev; // reverse link
      prev = curr; // move prev
      curr = nextNode; // move curr
    }

    return prev;
  }

  compute(head) {
    // Reverse the list
    head = this.reverseList(head);

    let maxSoFar = head.data;
    let curr = head;

    while (curr && curr.next) {
      // Remove node if smaller than maxSoFar
      if (curr.next.data < maxSoFar) {
        curr.next = curr.next.next;
      } else {
        curr = curr.next;
        maxSoFar = curr.data;
      }
    }

    // Restore original order
    return this.reverseList(head);
  }
}
