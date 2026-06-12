class Solution
{
public:
    bool kSubstr(string &s, int k)
    {
        int n = s.size();

        // String must be completely divisible into blocks of size k
        if (n % k != 0)
            return false;

        // Stores frequency of every k-length block
        unordered_map<string, int> freq;

        // Extract all blocks of length k
        for (int i = 0; i < n; i += k)
        {
            freq[s.substr(i, k)]++;
        }

        // All blocks are already identical
        if (freq.size() == 1)
            return true;

        // More than two different blocks cannot be fixed
        if (freq.size() > 2)
            return false;

        // If one block appears exactly once,
        // we can replace that block and make all blocks equal
        for (auto &it : freq)
        {
            if (it.second == 1)
                return true;
        }

        return false;
    }
};