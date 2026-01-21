class Solution {
  public:
    vector<int> calculateSpan(vector<int>& arr) {
        int n = arr.size();
        vector<int> span(n);
        stack<int> st; // stores indices

        for (int i = 0; i < n; i++) {
            // Remove all previous prices smaller or equal to current price
            while (!st.empty() && arr[st.top()] <= arr[i]) {
                st.pop();
            }

            // If stack is empty, span is i+1
            // Else span is distance from last greater element
            span[i] = st.empty() ? (i + 1) : (i - st.top());

            // Push current index
            st.push(i);
        }

        return span;
    }
};
