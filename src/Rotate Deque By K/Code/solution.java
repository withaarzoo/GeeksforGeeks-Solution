import java.util.Deque;

class Solution {
    public static void rotateDeque(Deque<Integer> dq, int type, int k) {
        int n = dq.size();
        if (n == 0) return;             // empty deque, nothing to do
        int r = k % n;
        if (r == 0) return;             // no effective rotations

        if (type == 1) {                // Right rotation
            for (int i = 0; i < r; ++i) {
                int val = dq.removeLast(); // remove last element
                dq.addFirst(val);          // add it to front
            }
        } else if (type == 2) {         // Left rotation
            for (int i = 0; i < r; ++i) {
                int val = dq.removeFirst(); // remove first element
                dq.addLast(val);            // add it to back
            }
        }
    }
}
