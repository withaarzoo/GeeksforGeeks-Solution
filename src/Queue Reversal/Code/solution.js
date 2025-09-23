/**
 * I assume q is represented as an array-like queue where:
 *  - dequeue: q.shift()  (remove front)
 *  - enqueue: q.push(x)  (add to back)
 *
 * If your environment uses a specific Queue class with
 * dequeue/enqueue methods, replace shift/push accordingly.
 */
/**
 * @param {Array} q
 * @returns {void}
 */
class Solution {
  reverseQueue(q) {
    if (!q || q.length <= 1) return;

    const stack = [];
    // Dequeue all elements into stack
    while (q.length > 0) {
      stack.push(q.shift());
    }
    // Enqueue all elements back from stack (reversed)
    while (stack.length > 0) {
      q.push(stack.pop());
    }
  }
}
