class Solution
{
public:
    int maxPeopleDefeated(int p)
    {
        // Binary search range
        long long low = 0, high = 10000;

        // Stores the maximum valid answer
        long long ans = 0;

        while (low <= high)
        {
            // Middle value of current search space
            long long mid = low + (high - low) / 2;

            // Sum of squares:
            // 1^2 + 2^2 + ... + mid^2
            long long sum = mid * (mid + 1) * (2 * mid + 1) / 6;

            // If total required strength is within p
            if (sum <= p)
            {
                ans = mid;     // mid is a valid answer
                low = mid + 1; // Try to find a larger one
            }
            else
            {
                high = mid - 1; // Need a smaller value
            }
        }

        // Return maximum people defeated
        return (int)ans;
    }
};