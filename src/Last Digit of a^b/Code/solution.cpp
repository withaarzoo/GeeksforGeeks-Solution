class Solution
{
public:
    // Fast modular exponentiation
    int powerMod(int base, int exp)
    {
        int result = 1;

        while (exp > 0)
        {

            // If current bit is set, multiply answer
            if (exp & 1)
                result = (result * base) % 10;

            // Square the base and keep only last digit
            base = (base * base) % 10;

            // Move to next bit
            exp >>= 1;
        }

        return result;
    }

    int getLastDigit(string &a, string &b)
    {

        // Any number raised to power 0 is 1
        if (b == "0")
            return 1;

        // Only last digit of a matters
        int lastDigit = a.back() - '0';

        // Compute b % 4 using string traversal
        int exponent = 0;
        for (char ch : b)
        {
            exponent = (exponent * 10 + (ch - '0')) % 4;
        }

        // Cycle length becomes 4 when remainder is 0
        if (exponent == 0)
            exponent = 4;

        // Compute required last digit
        return powerMod(lastDigit, exponent);
    }
};