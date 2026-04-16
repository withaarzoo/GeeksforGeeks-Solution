class Solution {
  public:
    int myAtoi(string &s) {
        int n = s.size();
        int i = 0;

        // Skip leading spaces
        while (i < n && s[i] == ' ') {
            i++;
        }

        // Check sign
        int sign = 1;
        if (i < n && (s[i] == '+' || s[i] == '-')) {
            if (s[i] == '-') {
                sign = -1;
            }
            i++;
        }

        long long num = 0;
        int INT_MAX_VAL = 2147483647;
        int INT_MIN_VAL = -2147483648;

        // Read digits
        while (i < n && isdigit(s[i])) {
            int digit = s[i] - '0';

            // Check overflow before adding digit
            if (num > (INT_MAX_VAL - digit) / 10) {
                return (sign == 1) ? INT_MAX_VAL : INT_MIN_VAL;
            }

            num = num * 10 + digit;
            i++;
        }

        return (int)(sign * num);
    }
};