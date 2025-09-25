import java.util.*;

class Solution {
    // Generate binary representations of numbers from 1 to n (as strings).
    public ArrayList<String> generateBinary(int n) {
        ArrayList<String> result = new ArrayList<>();
        if (n <= 0) return result;

        Queue<String> q = new LinkedList<>();
        q.add("1"); // start

        for (int i = 0; i < n; i++) {
            String s = q.poll();       // get front
            result.add(s);             // save
            q.add(s + "0");            // enqueue s0
            q.add(s + "1");            // enqueue s1
        }
        return result;
    }
}
