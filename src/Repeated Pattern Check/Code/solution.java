class Solution {
    public boolean findPattern(String s) {
        int n = s.length();
        int i = 0;
        while (i < n) {
            int x = 0;
            while (i < n && s.charAt(i) == 'x') {
                x++;
                i++;
            }
            int y = 0;
            while (i < n && s.charAt(i) == 'y') {
                y++;
                i++;
            }
            if (x == 0 || x != y) return false;
        }
        return true;
    }
}