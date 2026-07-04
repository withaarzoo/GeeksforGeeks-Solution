class Solution
{
public:
    int countSubstring(string &s)
    {
        int n = s.size();

        // Prefix sums can range from -n to n.
        // The offset lets me store negative sums in a normal array.
        int offset = n;
        vector<int> freq(2 * n + 1, 0);

        // The empty prefix has sum 0 and appears once.
        freq[offset] = 1;

        int prefix = 0;

        // This stores how many previous prefix sums
        // are smaller than the current prefix sum.
        long long smaller = 0;

        // I use long long internally to safely store the total count.
        long long answer = 0;

        for (char ch : s)
        {
            if (ch == '1')
            {
                // The prefix sum moves from prefix to prefix + 1.
                // Prefix sums equal to the old value now become smaller.
                smaller += freq[prefix + offset];

                // A '1' contributes +1.
                prefix++;
            }
            else
            {
                // The new prefix sum will be prefix - 1.
                // Values equal to that new sum are no longer smaller.
                smaller -= freq[prefix - 1 + offset];

                // A '0' contributes -1.
                prefix--;
            }

            // Every smaller previous prefix creates one valid substring
            // ending at the current position.
            answer += smaller;

            // Store the current prefix for future positions.
            freq[prefix + offset]++;
        }

        return static_cast<int>(answer);
    }
};