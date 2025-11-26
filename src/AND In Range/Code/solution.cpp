class Solution
{
public:
    int andInRange(int l, int r)
    {
        // We want the common prefix of l and r in binary.
        int shift = 0;

        // Keep shifting right until both numbers become equal.
        // While they differ, some bit position between them must flip
        // from 0 to 1 or 1 to 0 in the range, making that bit 0 in the final AND.
        while (l < r)
        {
            l >>= 1; // drop the least significant bit of l
            r >>= 1; // drop the least significant bit of r
            shift++; // count how many bits we dropped
        }

        // Now l == r, and it holds the common prefix.
        // Put back the dropped bits as zeros.
        return l << shift;
    }
};
