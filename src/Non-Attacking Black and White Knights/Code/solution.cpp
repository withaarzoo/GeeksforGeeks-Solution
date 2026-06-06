class Solution
{
public:
    int numOfWays(int n, int m)
    {
        // Total number of cells on the board
        long long cells = 1LL * n * m;

        // Total ordered ways to place black and white knights
        long long total = cells * (cells - 1);

        // Count all attacking placements
        long long attacking = 0;

        // Count 2 x 3 rectangles if they fit
        if (n >= 2 && m >= 3)
        {
            attacking += 4LL * (n - 1) * (m - 2);
        }

        // Count 3 x 2 rectangles if they fit
        if (n >= 3 && m >= 2)
        {
            attacking += 4LL * (n - 2) * (m - 1);
        }

        // Non-attacking placements
        return (int)(total - attacking);
    }
};