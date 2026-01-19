class Solution
{
public:
    string removeKdig(string &s, int k)
    {
        string st; // acts like a stack

        for (char ch : s)
        {
            // remove larger digits from left if possible
            while (!st.empty() && k > 0 && st.back() > ch)
            {
                st.pop_back();
                k--;
            }
            st.push_back(ch);
        }

        // if k is still left, remove from end
        while (k > 0 && !st.empty())
        {
            st.pop_back();
            k--;
        }

        // remove leading zeros
        int idx = 0;
        while (idx < st.size() && st[idx] == '0')
            idx++;

        string ans = st.substr(idx);
        return ans.empty() ? "0" : ans;
    }
};
