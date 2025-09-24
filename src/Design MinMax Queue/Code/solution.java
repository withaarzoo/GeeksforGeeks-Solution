// Java implementation
import java.util.*;

class SpecialQueue {
    private Queue<Integer> q;         // FIFO queue
    private Deque<Integer> minD;      // increasing deque for minima
    private Deque<Integer> maxD;      // decreasing deque for maxima

    public SpecialQueue() {
        q = new LinkedList<>();
        minD = new ArrayDeque<>();
        maxD = new ArrayDeque<>();
    }

    // Insert element x at rear
    public void enqueue(int x) {
        q.offer(x);
        while (!minD.isEmpty() && minD.peekLast() > x) minD.pollLast();
        minD.offerLast(x);
        while (!maxD.isEmpty() && maxD.peekLast() < x) maxD.pollLast();
        maxD.offerLast(x);
    }

    // Remove element from front
    public void dequeue() {
        if (q.isEmpty()) return;
        int v = q.poll();
        if (!minD.isEmpty() && minD.peekFirst() == v) minD.pollFirst();
        if (!maxD.isEmpty() && maxD.peekFirst() == v) maxD.pollFirst();
    }

    // Get front element
    public int getFront() {
        return q.isEmpty() ? -1 : q.peek();
    }

    // Get minimum element
    public int getMin() {
        return minD.isEmpty() ? -1 : minD.peekFirst();
    }

    // Get maximum element
    public int getMax() {
        return maxD.isEmpty() ? -1 : maxD.peekFirst();
    }
}
