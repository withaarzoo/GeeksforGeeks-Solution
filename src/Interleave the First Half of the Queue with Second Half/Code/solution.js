class Solution {
  rearrangeQueue(q) {
    let n = q.len();
    let firstHalf = new Queue();

    // Move first half elements
    for (let i = 0; i < n / 2; i++) {
      firstHalf.enqueue(q.peek());
      q.dequeue();
    }

    // Interleave
    while (!firstHalf.isEmpty()) {
      q.enqueue(firstHalf.peek());
      firstHalf.dequeue();

      q.enqueue(q.peek());
      q.dequeue();
    }
  }
}
