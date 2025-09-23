import java.util.*;

class Solution {
    public void reverseQueue(Queue<Integer> q) {
        // If queue is empty or has one element, nothing to do
        if (q == null || q.size() <= 1) return;

        Stack<Integer> st = new Stack<>();
        // Dequeue all items into stack
        while (!q.isEmpty()) {
            st.push(q.remove()); // remove() dequeues front element
        }
        // Push back from stack into queue (reversed order)
        while (!st.isEmpty()) {
            q.add(st.pop()); // add() enqueues at the back
        }
    }
}
