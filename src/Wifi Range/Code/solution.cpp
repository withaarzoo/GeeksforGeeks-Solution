class Solution
{
public:
    bool wifiRange(string &s, int x)
    {
        // I store the length of the hostel row so I can check the edges later.
        int n = s.size();

        // I keep track of the first router, previous router, and last router.
        int first = -1, prev = -1, last = -1;

        // I scan the whole string once.
        for (int i = 0; i < n; i++)
        {
            // A '1' means there is a router in this room.
            if (s[i] == '1')
            {
                // I save the first router position so I can check left-side coverage.
                if (first == -1)
                    first = i;

                // If there was a previous router, I check whether the gap is too large.
                // If the distance is greater than 2*x + 1, then some rooms in between are uncovered.
                if (prev != -1 && i - prev > 2 * x + 1)
                {
                    return false;
                }

                // I update previous router position for the next comparison.
                prev = i;

                // I also remember the last router to check right-side coverage at the end.
                last = i;
            }
        }

        // If there was no router at all, no room can be covered.
        if (first == -1)
            return false;

        // The first router must cover the leftmost room.
        // If it is farther than x from index 0, some left rooms stay uncovered.
        if (first > x)
            return false;

        // The last router must cover the rightmost room.
        // If it is farther than x from the last index, some right rooms stay uncovered.
        if (n - 1 - last > x)
            return false;

        // If none of the checks failed, every room is covered.
        return true;
    }
};