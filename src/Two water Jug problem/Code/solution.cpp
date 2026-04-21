class Solution
{
public:
    // Function to calculate GCD
    int gcd(int a, int b)
    {
        while (b != 0)
        {
            int temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }

    // Simulate pouring from one jug to another
    int pour(int fromCap, int toCap, int d)
    {
        int from = fromCap; // Fill source jug
        int to = 0;         // Target jug is empty
        int steps = 1;      // Filling source jug counts as one step

        while (from != d && to != d)
        {

            // Pour water from source jug to target jug
            int transfer = min(from, toCap - to);
            to += transfer;
            from -= transfer;
            steps++;

            // Check if we reached target
            if (from == d || to == d)
                break;

            // If source jug becomes empty, fill it again
            if (from == 0)
            {
                from = fromCap;
                steps++;
            }

            // If target jug becomes full, empty it
            if (to == toCap)
            {
                to = 0;
                steps++;
            }
        }

        return steps;
    }

    int minSteps(int m, int n, int d)
    {

        // If d is greater than both jug capacities
        if (d > max(m, n))
            return -1;

        // If d is not divisible by gcd, it is impossible
        if (d % gcd(m, n) != 0)
            return -1;

        // Try both directions and return minimum
        return min(pour(m, n, d), pour(n, m, d));
    }
};