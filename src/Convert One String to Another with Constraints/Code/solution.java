class Solution {
    public boolean isItPossible(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        int n = s1.length();
        int i = 0, j = 0;
        while (i < n && j < n) {
            while (i < n && s1.charAt(i) == '#') i++;
            while (j < n && s2.charAt(j) == '#') j++;
            if (i == n || j == n) break;
            if (s1.charAt(i) != s2.charAt(j)) return false;
            if (s1.charAt(i) == 'A' && i < j) return false;
            if (s1.charAt(i) == 'B' && i > j) return false;
            i++;
            j++;
        }
        while (i < n && s1.charAt(i) == '#') i++;
        while (j < n && s2.charAt(j) == '#') j++;
        return i == n && j == n;
    }
}