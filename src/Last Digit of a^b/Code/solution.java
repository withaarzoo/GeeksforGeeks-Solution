class Solution {

    // Fast modular exponentiation
    private int powerMod(int base, int exp) {
        int result = 1;

        while (exp > 0) {

            // Multiply when current bit is set
            if ((exp & 1) == 1) {
                result = (result * base) % 10;
            }

            // Square the base
            base = (base * base) % 10;

            // Move to next bit
            exp >>= 1;
        }

        return result;
    }

    public int getLastDigit(String a, String b) {

        // Any number raised to power 0 is 1
        if (b.equals("0")) {
            return 1;
        }

        // Only last digit matters
        int lastDigit = a.charAt(a.length() - 1) - '0';

        // Compute b % 4
        int exponent = 0;
        for (int i = 0; i < b.length(); i++) {
            exponent = (exponent * 10 + (b.charAt(i) - '0')) % 4;
        }

        // Replace 0 by 4 because cycle length is 4
        if (exponent == 0) {
            exponent = 4;
        }

        return powerMod(lastDigit, exponent);
    }
}