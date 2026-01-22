class Solution
{
public:
    int subarrayRanges(vector<int> &arr)
    {
        int n = arr.size();
        long long maxSum = 0, minSum = 0;
        vector<int> left(n), right(n);
        stack<int> st;

        // ---------- Maximum Contribution ----------
        // Previous Greater
        while (!st.empty())
            st.pop();
        for (int i = 0; i < n; i++)
        {
            while (!st.empty() && arr[st.top()] <= arr[i])
                st.pop();
            left[i] = st.empty() ? i + 1 : i - st.top();
            st.push(i);
        }

        // Next Greater
        while (!st.empty())
            st.pop();
        for (int i = n - 1; i >= 0; i--)
        {
            while (!st.empty() && arr[st.top()] < arr[i])
                st.pop();
            right[i] = st.empty() ? n - i : st.top() - i;
            st.push(i);
        }

        for (int i = 0; i < n; i++)
            maxSum += (long long)arr[i] * left[i] * right[i];

        // ---------- Minimum Contribution ----------
        while (!st.empty())
            st.pop();

        // Previous Smaller
        for (int i = 0; i < n; i++)
        {
            while (!st.empty() && arr[st.top()] >= arr[i])
                st.pop();
            left[i] = st.empty() ? i + 1 : i - st.top();
            st.push(i);
        }

        // Next Smaller
        while (!st.empty())
            st.pop();
        for (int i = n - 1; i >= 0; i--)
        {
            while (!st.empty() && arr[st.top()] > arr[i])
                st.pop();
            right[i] = st.empty() ? n - i : st.top() - i;
            st.push(i);
        }

        for (int i = 0; i < n; i++)
            minSum += (long long)arr[i] * left[i] * right[i];

        return maxSum - minSum;
    }
};
