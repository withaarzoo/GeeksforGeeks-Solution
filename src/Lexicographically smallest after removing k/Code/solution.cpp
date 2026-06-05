class Solution
{
public:
    string lexicographicallySmallest(string &s, int k)
    {
        int n = s.size();

        // Check whether n is a power of 2
        if ((n & (n - 1)) == 0)
            k /= 2;
        else
            k *= 2;

        // If removal is impossible or result becomes empty
        if (k >= n)
            return "-1";

        vector<char> st;

        // Build lexicographically smallest string
        for (char ch : s)
        {
            // Remove larger characters from the end
            while (!st.empty() && k > 0 && st.back() > ch)
            {
                st.pop_back();
                k--;
            }

            st.push_back(ch);
        }

        // If removals are still left, remove from the end
        while (k > 0)
        {
            st.pop_back();
            k--;
        }

        string ans(st.begin(), st.end());

        // Safety check
        return ans.empty() ? "-1" : ans;
    }
};