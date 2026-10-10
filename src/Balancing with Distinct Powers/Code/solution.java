class Solution {
    public boolean balancePan(int a, int b) {
        while (b > 0) {
            int r = b % a;
            if (r == 0 || r == 1) {
                b /= a;
            } else if (r == a - 1) {
                b = (b + 1) / a;
            } else {
                return false;
            }
        }
        return true;
    }
}