class Solution {
  public:
    int countSubarrays(vector<int> &arr) {
        int n = arr.size();
        stack<int> st;
        long long ans = 0;

        for(int i = n - 1; i >= 0; i--) {

            // Maintain monotonic stack
            while(!st.empty() && arr[st.top()] >= arr[i]) {
                st.pop();
            }

            // If no smaller element to the right
            if(st.empty()) {
                ans += (n - i);
            }
            else {
                ans += (st.top() - i);
            }

            // Push current index
            st.push(i);
        }

        return ans;
    }
};