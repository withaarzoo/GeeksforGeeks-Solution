class Solution
{
public:
    string compress(string &s)
    {
        int n = s.size(); // Store the length so we can work with indices easily.

        vector<int> pi(n, 0); // pi[i] stores the longest prefix that is also a suffix for s[0..i].

        // Build the KMP prefix-function array in O(n).
        for (int i = 1; i < n; i++)
        {
            int j = pi[i - 1]; // Start with the previous longest matching prefix.

            // If characters do not match, fall back using the KMP prefix links.
            while (j > 0 && s[i] != s[j])
            {
                j = pi[j - 1]; // Move to the next smaller possible prefix.
            }

            // Extend the matching prefix when the current characters are equal.
            if (s[i] == s[j])
            {
                j++;
            }

            pi[i] = j; // Store the longest prefix-suffix length for this position.
        }

        string ans;     // This stores the encrypted string while scanning from right to left.
        ans.reserve(n); // Reserve enough memory to avoid repeated reallocations.

        int i = n - 1; // Start from the last character of the original string.

        // Process the string from right to left.
        while (i >= 0)
        {
            int len = i + 1; // Current prefix length.

            // A compression needs an even-length prefix.
            if (len % 2 == 0)
            {
                int period = len - pi[i]; // Smallest repeating period suggested by KMP.

                // Check whether this prefix can be represented using one '*'.
                if (pi[i] >= len / 2 &&
                    len % (2 * period) == 0)
                {

                    ans.push_back('*'); // Replace the repeated part with '*'.

                    // Only the first half still needs to be processed.
                    i = len / 2;
                    i--; // Move to the last index of that remaining half.

                    continue; // Continue processing from the new position.
                }
            }

            ans.push_back(s[i]); // This character cannot be compressed, so keep it.
            i--;                 // Move one position to the left.
        }

        reverse(ans.begin(), ans.end()); // We built the answer backwards, so reverse it.

        return ans; // Return the lexicographically smallest encrypted string.
    }
};