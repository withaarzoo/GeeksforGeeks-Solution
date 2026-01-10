class Solution {

    private int atMostK(String s, int k) {
        if (k < 0) return 0;

        int[] freq = new int[26];
        int left = 0, distinct = 0, count = 0;

        for (int right = 0; right < s.length(); right++) {
            if (freq[s.charAt(right) - 'a'] == 0)
                distinct++;
            freq[s.charAt(right) - 'a']++;

            while (distinct > k) {
                freq[s.charAt(left) - 'a']--;
                if (freq[s.charAt(left) - 'a'] == 0)
                    distinct--;
                left++;
            }

            count += (right - left + 1);
        }

        return count;
    }

    public int countSubstr(String s, int k) {
        return atMostK(s, k) - atMostK(s, k - 1);
    }
}
