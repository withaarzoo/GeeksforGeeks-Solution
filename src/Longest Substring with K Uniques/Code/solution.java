import java.util.*;

class Solution {
    public int longestKSubstr(String s, int k) {

        Map<Character, Integer> map = new HashMap<>();
        int left = 0;
        int maxLen = -1;

        for (int right = 0; right < s.length(); right++) {

            char c = s.charAt(right);
            map.put(c, map.getOrDefault(c, 0) + 1);

            // Shrink window if unique characters exceed k
            while (map.size() > k) {

                char leftChar = s.charAt(left);
                map.put(leftChar, map.get(leftChar) - 1);

                if (map.get(leftChar) == 0) {
                    map.remove(leftChar);
                }

                left++;
            }

            // If exactly k unique characters
            if (map.size() == k) {
                maxLen = Math.max(maxLen, right - left + 1);
            }
        }

        return maxLen;
    }
}