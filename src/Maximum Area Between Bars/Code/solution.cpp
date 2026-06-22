class Solution
{
public:
    int maxArea(vector<int> &height)
    {
        int n = (int)height.size(); // I store the number of bars so I can handle small arrays safely.
        if (n < 2)
            return 0; // I need at least two bars to form a rectangle.

        int left = 0;       // I start from the leftmost bar.
        int right = n - 1;  // I start from the rightmost bar.
        long long best = 0; // I keep the best area found so far in long long to avoid overflow.

        while (left + 1 < right)
        {                                                                       // I stop when the pointers become adjacent, because width then becomes 0.
            long long width = right - left - 1;                                 // I count only the bars strictly between the two chosen bars.
            long long current = 1LL * min(height[left], height[right]) * width; // I use the shorter bar as the height limit.
            if (current > best)
                best = current; // I update the answer whenever I find a larger rectangle.

            if (height[left] <= height[right])
            {
                left++; // I move the shorter side inward, because that is the only side that may improve the height limit.
            }
            else
            {
                right--; // I do the same from the right side when the right bar is shorter.
            }
        }

        return (int)best; // I return the best area found.
    }
};