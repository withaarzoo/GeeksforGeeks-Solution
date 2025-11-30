class Solution
{
public:
    int countSubs(std::string &s)
    {
        int n = s.size();
        // Maximum number of states in SAM = 2 * n
        struct State
        {
            int next[26]; // transitions for 'a' to 'z'
            int link;     // suffix link
            int len;      // length of longest string for this state
            State()
            {
                std::fill(next, next + 26, -1);
                link = -1;
                len = 0;
            }
        };

        std::vector<State> st;
        st.reserve(2 * n);
        st.push_back(State()); // state 0: initial state
        int last = 0;          // state representing whole string so far

        auto extend = [&](char ch)
        {
            int c = ch - 'a';
            int cur = (int)st.size();
            st.push_back(State());
            st[cur].len = st[last].len + 1;

            int p = last;
            // Add transition from all states that don't have 'c'
            while (p != -1 && st[p].next[c] == -1)
            {
                st[p].next[c] = cur;
                p = st[p].link;
            }

            if (p == -1)
            {
                // If we reached root's "before", link to 0
                st[cur].link = 0;
            }
            else
            {
                int q = st[p].next[c];
                if (st[p].len + 1 == st[q].len)
                {
                    // Simple case: we can just link to q
                    st[cur].link = q;
                }
                else
                {
                    // Need to create a clone state
                    int clone = (int)st.size();
                    st.push_back(st[q]); // copy q
                    st[clone].len = st[p].len + 1;
                    // Fix links for p where next[c] == q
                    while (p != -1 && st[p].next[c] == q)
                    {
                        st[p].next[c] = clone;
                        p = st[p].link;
                    }
                    st[q].link = st[cur].link = clone;
                }
            }
            last = cur; // update last
        };

        // Build SAM
        for (char ch : s)
        {
            extend(ch);
        }

        // Count distinct substrings using formula:
        // sum(len[v] - len[link[v]]) for all v != 0
        long long ans = 0;
        for (int v = 1; v < (int)st.size(); ++v)
        {
            ans += st[v].len - st[st[v].link].len;
        }
        return (int)ans;
    }
};
