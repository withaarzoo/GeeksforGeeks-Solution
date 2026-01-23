#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int maxPeople(vector<int> &arr)
    {
        int n = arr.size();
        if (n == 0)
            return 0;

        vector<int> next_ge(n, n);  // default n => no greater/equal to right
        vector<int> prev_ge(n, -1); // default -1 => no greater/equal to left
        stack<int> st;

        // Compute next_ge: nearest index to right with height >= arr[i]
        for (int i = 0; i < n; ++i)
        {
            while (!st.empty() && arr[i] >= arr[st.top()])
            {
                next_ge[st.top()] = i;
                st.pop();
            }
            st.push(i);
        }
        // clear stack to reuse
        while (!st.empty())
            st.pop();

        // Compute prev_ge: nearest index to left with height >= arr[i]
        for (int i = 0; i < n; ++i)
        {
            // pop strictly smaller heights, so top (if exists) is >= arr[i]
            while (!st.empty() && arr[st.top()] < arr[i])
                st.pop();
            if (!st.empty())
                prev_ge[i] = st.top();
            st.push(i);
        }

        // compute maximum visible people for every i
        int ans = 0;
        for (int i = 0; i < n; ++i)
        {
            int left_count = i - prev_ge[i] - 1;
            int right_count = next_ge[i] - i - 1;
            int total = left_count + right_count + 1; // include self
            ans = max(ans, total);
        }
        return ans;
    }
};
