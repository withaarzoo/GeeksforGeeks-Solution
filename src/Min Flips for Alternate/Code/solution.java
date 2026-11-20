class Solution {
    public int minFlips(String s) {
        int n = s.length();
        int flips0 = 0, flips1 = 0;
        for (int i = 0; i < n; i++) {
            char expected0 = (i % 2 == 0) ? '0' : '1';
            char expected1 = (i % 2 == 0) ? '1' : '0';
            if (s.charAt(i) != expected0) flips0++;
            if (s.charAt(i) != expected1) flips1++;
        }
        return Math.min(flips0, flips1);
    }
}