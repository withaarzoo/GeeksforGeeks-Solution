class Solution
{
public:
    // Function to calculate sum of digits
    long long digitSum(long long x)
    {
        long long sum = 0;
        while (x > 0)
        {
            sum += x % 10;
            x /= 10;
        }
        return sum;
    }

    int getCount(int n, int d)
    {
        long long left = 1, right = n;
        long long ans = -1;

        // Binary Search to find smallest valid number
        while (left <= right)
        {
            long long mid = left + (right - left) / 2;

            if (mid - digitSum(mid) >= d)
            {
                ans = mid;       // Possible answer
                right = mid - 1; // Try to find smaller one
            }
            else
            {
                left = mid + 1;
            }
        }

        if (ans == -1)
            return 0; // No valid number

        return n - ans + 1;
    }
};
