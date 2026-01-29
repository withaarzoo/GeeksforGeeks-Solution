import java.util.*;

class Solution {
    public String firstNonRepeating(String s) {
        int[] freq = new int[26];
        Queue<Character> q = new LinkedList<>();
        StringBuilder result = new StringBuilder();

        for (char ch : s.toCharArray()) {
            freq[ch - 'a']++;
            q.offer(ch);

            while (!q.isEmpty() && freq[q.peek() - 'a'] > 1) {
                q.poll();
            }

            if (q.isEmpty())
                result.append('#');
            else
                result.append(q.peek());
        }
        return result.toString();
    }
}
