class Solution
{
public:
    // I use Euclid's algorithm to find the GCD of two numbers.
    int gcd(int a, int b)
    {
        // I keep reducing the larger value using the remainder.
        while (b != 0)
        {
            // The remainder becomes the next value of b.
            int temp = a % b;

            // I move b into a for the next GCD step.
            a = b;

            // I store the remainder in b.
            b = temp;
        }

        // When b becomes 0, a is the GCD.
        return a;
    }

    int sameMod(vector<int> &arr)
    {
        // I start with 0 because gcd(0, x) is x.
        int g = 0;

        // I compare every element with the first element.
        // Only these differences are needed to find the common divisor.
        for (int i = 1; i < arr.size(); i++)
        {
            // I calculate the absolute difference because only divisibility matters.
            int diff = abs(arr[i] - arr[0]);

            // I update the GCD with the current difference.
            g = gcd(g, diff);
        }

        // If the GCD is 0, every element is equal.
        // Then every positive k works, so there are infinitely many answers.
        if (g == 0)
        {
            return -1;
        }

        // I will store the number of positive divisors of g.
        int ans = 0;

        // Divisors come in pairs, so I only need to check up to sqrt(g).
        for (int i = 1; 1LL * i * i <= g; i++)
        {
            // If i divides g, both i and g/i are divisors.
            if (g % i == 0)
            {
                // I count i as one divisor.
                ans++;

                // If the two divisors are different, I count g/i separately.
                if (i != g / i)
                {
                    ans++;
                }
            }
        }

        // I return the total number of valid positive values of k.
        return ans;
    }
};