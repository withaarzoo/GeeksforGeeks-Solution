class Solution {
    public int myAtoi(String s) {
        int n = s.length();
        int i = 0;

        // Skip leading spaces
        while (i < n && s.charAt(i) == ' ') {
            i++;
        }

        // Check sign
        int sign = 1;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            if (s.charAt(i) == '-') {
                sign = -1;
            }
            i++;
        }

        long num = 0;
        int INT_MAX_VAL = 2147483647;
        int INT_MIN_VAL = -2147483648;

        // Read digits
        while (i < n && Character.isDigit(s.charAt(i))) {
            int digit = s.charAt(i) - '0';

            // Check overflow before adding digit
            if (num > (INT_MAX_VAL - digit) / 10) {
                return (sign == 1) ? INT_MAX_VAL : INT_MIN_VAL;
            }

            num = num * 10 + digit;
            i++;
        }

        return (int) (sign * num);
    }
}