class Solution {
    public int smallestSubstring(String s) {
        int n = s.length();
        int[] count = new int[3];

        int left = 0;
        int ans = Integer.MAX_VALUE;

        for (int right = 0; right < n; right++) {
            count[s.charAt(right) - '0']++;

            while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
                ans = Math.min(ans, right - left + 1);

                count[s.charAt(left) - '0']--;
                left++;
            }
        }

        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}