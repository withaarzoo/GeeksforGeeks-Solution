class Solution {
    public static String minWindow(String s, String p) {

        int[] freqP = new int[256];
        int[] window = new int[256];

        for (char c : p.toCharArray())
            freqP[c]++;

        int left = 0, right = 0;
        int count = 0;
        int minLen = Integer.MAX_VALUE;
        int start = 0;

        while (right < s.length()) {

            char c = s.charAt(right);
            window[c]++;

            if (freqP[c] != 0 && window[c] <= freqP[c])
                count++;

            while (count == p.length()) {

                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    start = left;
                }

                char leftChar = s.charAt(left);
                window[leftChar]--;

                if (freqP[leftChar] != 0 && window[leftChar] < freqP[leftChar])
                    count--;

                left++;
            }

            right++;
        }

        if (minLen == Integer.MAX_VALUE)
            return "";

        return s.substring(start, start + minLen);
    }
}